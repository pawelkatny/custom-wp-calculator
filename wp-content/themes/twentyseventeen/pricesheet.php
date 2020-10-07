<?php
/*
Template Name: Price Sheet
*/
?>

<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="wrap">
    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">


            <!-- MODALS WINDOWS -->
            <div class="modal-custom" id="customerModal">
                <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edytuj dane klienta</h5>
                            <button type="button" class="close">
                                <span id="customerCloseBtn">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Imię</label>
                                <input type="text" class="form-control text-center" id="customerName" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Nazwisko</label>
                                <input type="text" class="form-control text-center" id="customerLastName" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Numer telefonu</label>
                                <input type="text" class="form-control text-center" id="customerPhone" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Adres e-mail</label>
                                <input type="text" class="form-control text-center" id="customerEmail" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Orientacja względem słońca</label>
                                <select class="form-control text-center" id="sunOrientation">
                                    <option value=" - ">wybierz...</option>
                                    <option value="wschód">Wschód</option>
                                    <option value="zachód">Zachód</option>
                                    <option value="południe">Południe</option>
                                    <option value="południowy wschód">Południowy wschód</option>
                                    <option value="południowy zachód">Południowy zachód</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Kąt nachylenia dachu</label>
                                <select class="form-control" id="slopeAngle">
                                    <option value=" - ">wybierz...</option>
                                    <option value="0">Płaski</option>
                                    <option value="15">15 Stopni</option>
                                    <option value="30">30 Stopni</option>
                                    <option value="40">40 Stopni</option>
                                    <option value="45">45 Stopni</option>
                                    <option value="60">60 Stopni</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Rodzaj pokrycia dachu</label>
                                <select class="form-control" id="roofType">
                                    <option value=" - ">wybierz...</option>
                                    <option value="dachówka">Dachówka</option>
                                    <option value="blachodachówka">Blachodachówka</option>
                                    <option value="gont bitumiczny">Gont bitumiczny</option>
                                    <option value="papa">Papa</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" id="customerResetBtn">Resetuj</button>
                            <button type="button" class="btn btn-primary" id="customerSaveBtn">Zapisz</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-custom" id="discountModal">
                <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Dodaj zniżkę</h5>
                            <button type="button" class="close">
                                <span id="discountCloseBtn">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nazwa</label>
                                <input type="text" class="form-control text-center" id="discountNameInput" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Wartość</label>
                                <input type="text" class="form-control text-center" id="discountValueInput" placeholder="">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="discountSaveBtn">Zapisz</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-custom" id="variableModal">
                <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edytuj zmienne</h5>
                            <button type="button" class="close">
                                <span id="variableCloseBtn">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Arkusz #1</label>
                                <input type="text" class="form-control text-center" id="sheet1" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Arkusz #2</label>
                                <input type="text" class="form-control text-center" id="sheet2" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Arkusz #3</label>
                                <input type="text" class="form-control text-center" id="sheet3" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Arkusz #4</label>
                                <input type="text" class="form-control text-center" id="sheet4" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Arkusz #5</label>
                                <input type="text" class="form-control text-center" id="sheet5" placeholder="">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="variableSaveBtn">Zapisz</button>
                        </div>
                        <div class="card-body text-center">
                            <p class="card-text">* zmienne przechowywane jako liczby - dla wartości procentowych wpisz ułamek dzisiętny np. 15% -> 0.15</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- END OF MODALS -->

            <div class="modal-dialog modal-xl sheet-container">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Arkusz wyceny</h5>
                        <div>
                            <button type="button" class="btn btn-primary" id="customerBtn">Dane klienta</button>
                            <button type="button" class="btn btn-primary" id="variableBtn">Edytuj zmienne</button>
                        </div>

                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-around">
                            <div class="col-4">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">Obliczenia</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <select class="form-control text-center" id="sheetNumber">
                                                <option>Arkusz #1</option>
                                                <option>Arkusz #2</option>
                                                <option>Arkusz #3</option>
                                                <option>Arkusz #4</option>
                                                <option>Arkusz #5</option>
                                            </select>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="form-group">
                                                <label for="formGroupExampleInput" class="font-weight-bold">Zapotrzebowanie roczne U [kWh]</label>
                                                <input type="text" class="form-control text-center" id="varU" placeholder="">
                                            </div>
                                        </li>
                                        <li class="list-group-item font-weight-bold">Zapotrzebowanie Fi [kWh] (=Ux125%)</li>
                                        <li class="list-group-item text-center h5" id="varFi"></li>
                                        <li class="list-group-item font-weight-bold">Moc F [kWh] (=Fi:1000)</li>
                                        <li class="list-group-item text-center h5" id="varF"></li>
                                        <li class="list-group-item">
                                            <div class="form-group">
                                                <label for="formGroupExampleInput" class="font-weight-bold">Robocizna [PLN] -> na jednostke mocy F</label>
                                                <input type="text" class="form-control text-center" id="serviceInput" placeholder="">
                                            </div>
                                        </li>
                                        <li class="list-group-item text-center font-weight-bold">Robocizna całość [PLN]</li>
                                        <li class="list-group-item text-center h5" id="serviceInputTotal"></li>
                                        <li class="list-group-item text-center font-weight-bold">Prowizja dystrybucyjna [PLN]</li>
                                        <li class="list-group-item text-center h5" id="commision"></li>
                                    </ul>
                                    <div class="card-body text-center">
                                        <button type="button" class="btn btn-success" id="calculateBtn">Oblicz</button>
                                        <button type="button" class="btn btn-warning" id="resetBtn">Resetuj</button>
                                    </div>
                                    <div class="card-body text-center">
                                        <p class="card-text">* obliczenia zaokrąglone do części setnej</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <!-- DANE KLIENTA -->
                                <div id="printPdf">
                                    <div class="border mb-3">
                                        <ul class="list-unstyled mt-3 px-3">
                                            <li>Imię i nazwisko: <span class="font-weight-bold" id="fullName"></span></li>
                                            <li>Telefon: <span class="font-weight-bold" id="phoneNumber"></span></li>
                                            <li>Adres email: <span class="font-weight-bold" id="emailAdress"></span></li>
                                        </ul>
                                        <ul class="list-unstyled mt-3 px-3">
                                            <li>Orientacja względem słońca: <span class="font-weight-bold" id="sun"></span></li>
                                            <li>Kąt nachylenia dachu: <span class="font-weight-bold" id="angle"></span></li>
                                            <li>Rodzaj pokrycia dachu: <span class="font-weight-bold" id="roof"></span></li>
                                        </ul>
                                    </div>

                                    <!-- MATERIAŁY Z KOSZYKA -->
                                    <div class="card border-0">
                                        <div class="card-header d-flex justify-content-between align-items-center font-weight-bold">
                                            Materiały
                                            <span class="">Cena netto</span>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <?php list_cart_items() ?>
                                            <li class="list-group-item bg-light font-weight-bold d-flex justify-content-between align-items-center">
                                                Razem
                                                <span class="h5" id="cartTotal"><?php echo get_cart_net_total() ?></span>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- OPŁATY DODATKOWE MONTAZ + PROWIZJA -->
                                    <div class="card border-0 mt-4">
                                        <div class="card-header d-flex justify-content-between align-items-center font-weight-bold">
                                            Opłaty dodatkowe
                                            <span class="">Cena netto</span>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Montaż
                                                <span class="h5" id="serviceUI">0</span>
                                            </li>
                                            <li class="list-group-item bg-light d-flex justify-content-between align-items-center font-weight-bold">
                                                Razem
                                                <span class="h5" id="feeTotal">0</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- ZNIZKI -->
                                    <div class="card border-0 mt-4">
                                        <div class="card-header d-flex justify-content-between align-items-center font-weight-bold">
                                            Zniżki
                                            <div id='discountDiv'>
                                                <button type="button" class="btn btn-primary" id="discountModalBtn">Dodaj</button>
                                                <button type="button" class="btn btn-warning" id="radiscountResetBtn">Resetuj</button>
                                            </div>
                                        </div>
                                        <ul class="list-group list-group-flush" id="discountContainer">

                                        </ul>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item bg-light font-weight-bold  d-flex justify-content-between align-items-center" id="discountTotalList">
                                                Razem
                                                <span class="h5" id="discountTotal">0</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- PODSUMOWANIE -->
                                    <div class="card border-0 mt-4">
                                        <div class="card-header d-flex justify-content-between align-items-center font-weight-bold">
                                            Podsumowanie
                                            <span class="">Cena</span>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Materiały
                                                <span class="h5" id="cartSummary">0</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Opłaty dodatkowe
                                                <span class="h5" id="feeSummary">0</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-end align-items-center">
                                                <span class="h5 font-weight-bold" id="cartFeeSummary">0</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                VAT
                                                <span class="h5" id="VAT">0</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Zniżki
                                                <span class="h5" id="discountSummary">0</span>
                                            </li>
                                            <li class="list-group-item bg-light font-weight-bold d-flex justify-content-between align-items-center">
                                                Razem
                                                <span class="h5 font-weight-bold" id="total">0</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="text-center mt-3"><button class="btn btn-primary" id="printPdfBtn">Zapisz i pobierz PDF</button></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div><button tyoe="submit" id="saveOrderBtn">TEST SAVE ORDER</button></div>

            <!-- modals -->
        </main><!-- #main -->
    </div><!-- #primary -->
</div><!-- .wrap -->

<?php
get_footer();
?>