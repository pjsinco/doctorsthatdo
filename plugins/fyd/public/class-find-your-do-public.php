<?php

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 */
class Find_Your_Do_Public 
{

    private $plugin_name;
    private $version;
    private $results_post_id;

    public function __construct( $plugin_name, $version, $results_post_id ) 
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->results_post_id = $results_post_id;

    }

    /**
     * Remove the title from the results page.
     *
     */
    public function remove_the_title($title)
    {
        global $post;

        // Make sure we're inside the loop so we don't filter any of the 
        // titles we shouldn't be filtering.
        if (is_page() && $post->ID == $this->results_post_id && in_the_loop()) {
            $title = '';
        }

        return $title;
    }

    public function add_results_divs($content)
    {
        global $post;

        if (is_page() && $post->ID == $this->results_post_id) {
            ob_start();
            require_once(
                plugin_dir_path(__FILE__) . 
                    'partials/results-divs.php'
            );
            $content .= ob_get_clean();
        }
        
        return $content;
    }

    /**
     * Append the underscores templates for displaying results.
     *
     */
    public function add_js_templates()
    {
        global $post;

        if (is_page() && $post->ID == $this->results_post_id) {
            ob_start();
            require_once(
                plugin_dir_path(__FILE__) . 
                    'partials/find-your-do-public-display.php'
            );
            echo ob_get_clean();
        }
    }

    public function enqueue_styles() 
    {
        wp_enqueue_style( 
            $this->plugin_name, 
            plugin_dir_url( __FILE__ ) . 'css/find-your-do-public.css', 
            array(), 
            $this->version, 
            'all'
        );
    }

    public function enqueue_scripts() 
    {
        wp_enqueue_script( 
            $this->plugin_name, 
            plugin_dir_url( __FILE__ ) . 'js/find-your-do-public.js', 
            //array( 'jquery', 'underscore', 'backbone' ), 
            array( 'jquery', 'backbone' ), 
            $this->version, 
            false 
        );

        wp_localize_script(
            $this->plugin_name, 
            'fydSettings',
            array(
                'imagePath' => plugin_dir_url( __FILE__ ) . 'img/', 
            )
        );
    }

//    public function say_yes_to_is_active_sidebar($is_active_sidebar)
//    {
//        global $post; 
//    
//        if (is_page() && $post->ID == $this->results_post_id) {
//            return true;
//        }
//        
//        return $is_active_sidebar;
//
//    }

    public function add_map_block($sidebar_name)
    {
        global $post;

        if (is_page() && $post->ID == $this->results_post_id) {

            ob_start();
            require_once(
                plugin_dir_path(__FILE__) . 
                    'partials/sidebar-find-your-do-results.php'
            );
            echo ob_get_clean();
        }

        return $sidebar_name;
    }

    public function fyd_load_page_template($page_template)
    {
        global $post;

        if (is_page() && $post->ID == $this->results_post_id) {
            $page_template = plugin_dir_path(__FILE__) . 
                'templates/page-find-your-do-results.php';
        }

        return $page_template;
    }

}
