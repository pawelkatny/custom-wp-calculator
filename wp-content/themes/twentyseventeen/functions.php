<?php

/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 1.0
 */

/**
 * Twenty Seventeen only works in WordPress 4.7 or later.
 */

add_action('wp_enqueue_scripts', 'price_sheet_enqueue');
function price_sheet_enqueue()
{
	if (is_page('arkusze')) {
		wp_enqueue_script('html_2_pdf', get_stylesheet_directory_uri() . '/assets/js/html2pdf.bundle.min.js', array(), time(), true);
		wp_enqueue_script('price_sheet_js', get_stylesheet_directory_uri() . '/assets/js/priceSheet.js', array(), time(), true);

		wp_register_style("price_sheet_css", get_stylesheet_directory_uri() . "/assets/css/priceSheetStyles.css", array(), time(), false);
		wp_enqueue_style('price_sheet_css');
	}
}


//CUSTOM FUNCTIONS

//geting cart total without VAT
function get_cart_net_total()
{
	$cart = WC()->cart->get_subtotal();

	return $cart;
}

//listing car items on page (arkusze) load
function list_cart_items()
{
	foreach (WC()->cart->get_cart() as $cart_item) {
		$item_name = $cart_item['data']->get_title();
		$quantity = $cart_item['quantity'];
		$price = $cart_item['data']->get_price();

		echo '
		<li class="list-group-item d-flex justify-content-between align-items-center">
			<div>
				' . $item_name . '<span class="font-weight-bold"> x ' . $quantity . '</span>
			</div>
			<span class="h5">' . $price . '</span>
		</li>';
	};
}

//sending stored variables to front end
add_action('wp_ajax_get_post_data', 'get_post_data');
add_action('wp_ajax_nopriv_get_post_data', 'get_post_data');
function get_post_data()
{
	$post = get_post(2341);
	$output = $post->post_content;
	echo wp_strip_all_tags($output);

	wp_die();
}

//saving variables data to specific post as a string
add_action('wp_ajax_update_post_ajax', 'update_post_ajax');
add_action('wp_ajax_nopriv_update_post_ajax', 'update_post_ajax');
function update_post_ajax()
{
	$post = get_post(2341);

	$ajax_data = stripslashes_deep($_POST);
	$new_data = $ajax_data['sheet_data'];
	$post_update = array(
		'ID' => 2341,
		'post_content' => $new_data
	);
	wp_update_post($post_update);
	echo $new_data;

	wp_die();
}

//creating new order
add_action('wp_ajax_create_new_order_ajax', 'create_new_order_ajax');
function create_new_order_ajax()
{

	$address = array(
		'first_name' => $_POST['first_name'],
		'last_name'  => $_POST['last_name'],
		'email'      => $_POST['email'],
		'phone'      => $_POST['phone'],
		'address_1'  => $_POST['address_1'],
		'city'       => $_POST['city'],
		'postcode'   => $_POST['postcode'],
		'country'    => $_POST['country'],
	);

	$service_total = $_POST['service'];
	$discount_total = $_POST('discount');

	$order = wc_create_order();

	foreach (WC()->cart->get_cart() as $cart_item) {
		$product_id = $cart_item['product_id'];
		$quantity = $cart_item['quantity'];
		$product = wc_get_product($product_id);
		if ($service_total != 0) {
			$product->set_tax_class('obnizona-stawka');
		}
		$order->add_product($product, $quantity);
	}

	if ($service_total != 0) {
		$item_fee = new WC_Order_Item_Fee();
		$item_fee->set_name("Montaż");
		$item_fee->set_amount($service_total);
		$item_fee->set_tax_class('obnizona-stawka');
		$item_fee->set_tax_status('taxable');
		$item_fee->set_total($service_total);
		$order->add_item($item_fee);
	}

	if ($discount_total != 0) {
		$discount_item = new WC_Order_Item_Coupon();
		$discount_item->set_props(array('code' => 'znizka', 'discount' => $discount_total, 'discount_tax' => 0));
		$order->add_item($discount_item);
		$order->save();
	}

	$order->set_address($address, 'billing');
	$order->calculate_totals();
	$order->update_status("Completed", 'Imported order', TRUE);

	wp_die();
}
