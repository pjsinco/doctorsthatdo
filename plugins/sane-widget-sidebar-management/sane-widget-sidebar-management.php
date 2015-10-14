<?php
/*
Plugin Name: Sane Widget Sidebar Management
Description: Manage one sidebar at a time to maintain widget sanity. UPDATED: By Orbit Media Studios for use with WordPress 3.8+
Author: WebDevStudios.com, Orbit Media Studios
Version: 1.0.2
*/

class WDS_Widget_Sidebar_Manage {

	public function __construct() {
		add_action( 'load-widgets.php', array( $this, 'init_hooks' )  );
	}

	public function init_hooks() {
		add_action( 'widgets_admin_page', array( $this, 'sidebar_select' )  );
		//add_action( 'admin_print_styles', array( $this, 'print_styles' ) );

		wp_enqueue_script( 'wds-widget-manage-scripts', plugins_url( '/widget-sidebar-manage.js', __FILE__ ), array( 'jquery', 'admin-widgets' ), '1.0.0' );
	}

	public function print_styles() {
?>

<?php
	}

	public function sidebar_select() {
		global $wp_registered_sidebars;
		?>
		<div id="widget-sidebar-manage-wrap" class="widget-liquid-right" style="display: none;">
			<select id="widget-sidebar-manage" name="widget-sidebar-manage">
				<option value=""><?php _e( 'Select Widget Area', 'wds' ); ?></option>
				<?php
				foreach ( $wp_registered_sidebars as $id => $sidebar ) {
					if (
						$sidebar['id'] == 'wp_inactive_widgets'
						|| ( false !== strpos( $sidebar['id'], 'orphaned_widgets' ) )
					)
						continue;
					echo '<option value="'. $sidebar['id'] .'">'. $sidebar['name'] .'</option>';
				}
				?>
			</select>
			<label id="widget-sidebar-manage-label"><b><?php _e( 'Select a Widget Area to Edit:', 'wds' ); ?></b></label>
			<div style="clear:both;"></div>
		</div>
		<?php
	}
}
new WDS_Widget_Sidebar_Manage();
