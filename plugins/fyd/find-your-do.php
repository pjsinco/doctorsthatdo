<?php

/**
 * Plugin Name:       FYD
 * Plugin URI:        github
 * Description:       Find Your DO app
 * Version:           1.0.0
 * Author:            pjs
 * Author URI:        https://github.com/pjsinco
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) 
{
    die;
}

function activate_find_your_do() 
{
    require_once plugin_dir_path( __FILE__ ) . 
        'includes/class-find-your-do-activator.php';
    Find_Your_Do_Activator::activate();
}

function deactivate_find_your_do() 
{
    require_once plugin_dir_path( __FILE__ ) . 
        'includes/class-find-your-do-deactivator.php';
    Find_Your_Do_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_find_your_do' );
register_deactivation_hook( __FILE__, 'deactivate_find_your_do' );

/**
 * The core plugin class admin-specific hooks, and public-facing site hooks.
 *
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-find-your-do.php';

function run_find_your_do() 
{

    $results_post_id = get_option('fyd_post_id');
    $plugin = new Find_Your_Do($results_post_id);
    $plugin->run();

}
run_find_your_do();
