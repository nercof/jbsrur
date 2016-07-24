<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _tk
 */

get_header();
?>
    <!-- MAIN CONTENT -->
    <div class="container">
    <!-- THIS IS WHERE WE WILL INJECT OUR CONTENT ============================== -->
    Index Level
        <div ui-view></div>
    </div>
<!--
    <?php include('includes/tokko-api.php');
	   $auth = new TokkoAuth('8fe7f17376761bada8524d0a75c8937f8a4517b7');
	   $search_form = new TokkoSearchForm($auth);
    ?>
	<div id="buscador_prop">
      	<div id="div_form_prop">
         	<p class="txt_input_prop">TIPO DE OPERACION</p>
         	<?php $search_form->deploy_operation_types_selection('operation_selector', "Seleccione el tipo de operacion", [1,2], "campos_prop"); ?>
         	<p class="txt_input_prop">TIPO DE INMUEBLE</p>
         	<?php $search_form->deploy_property_types_selection('property_types_selector', "Seleccione el tipo de propiedad", "campos_prop"); ?>
         	<div id="location_tree_container">
             	<?php $search_form->deploy_location_tree('location_tree', "Seleccione una opcion", "location_tree-type", "location_tree-id", "147", "state", 3, 'div', true, ['PROVINCIA','CIUDAD','ZONA']);?>
         	</div>
         	<div id="moneda_container">
             	<p class="txt_input_prop">MONEDA</p>
             	<ul class="lista_buscador_avanz">
                 	<?php $search_form->deploy_currency_selection('currency_selector', "", ["USD","ARS"], "input_buscador", "USD", "radiobutton", 'li');?>
             	</ul>
         	</div>
      	</div>
		<div id="div_form_prop">
			<div id="rango_precio_container">
				<p class="txt_input_prop">PRECIO</p>
				<?php $search_form->deploy_price_range_selection('price_range_selector', ["minimo", "maximo"]);?>
			</div>
			<div id="rango_precio_container">
				<p class="txt_input_prop">AMBIENTES</p>
			         <?php $search_form->deploy_range_filter_selection('room_amount_selector', "room_amount", ["minimo", "maximo"]);?>
			</div>
			<?php $search_form->deploy_search_button('do_search_button', 'BUSCAR', 'enviar_prop');?>
		</div>
    	<?php $search_form->deploy_search_function('index.php');?>
	</div>
	<?php if ( have_posts() ) : ?>

		<?php /* Start the Loop */ ?>
		<?php while ( have_posts() ) : the_post(); ?>

			<?php
				/* Include the Post-Format-specific template for the content.
				 * If you want to overload this in a child theme then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'content', get_post_format() );
			?>

		<?php endwhile; ?>
-->
		<?php _tk_content_nav( 'nav-below' ); ?>

	<?php else : ?>

		<?php get_template_part( 'no-results', 'index' ); ?>

	<?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
