<?php

class Find_Your_Do_Activator 
{

    public static function activate() 
    {
        
        // Delete the page, entry if they exist
        $results_post_id = get_option('fyd_post_id');
        if ($results_post_id) {
            wp_delete_post($post_id, true);
            self::fyd_delete_option();
        }

        // Create a new page to hold results
        $post_id = self::fyd_create_results_page();
        self::fyd_update_options($post_id);
    }

    /**
     * Store the post id of the page used to display the search results
     *
     */
    private static function fyd_update_options($post_id)
    {
        update_option('fyd_post_id', $post_id);
    }

    /**
     * Create a new page to display the search results.
     * This page will essentially be the home of the app, 
     * and the one to which we inject all the information 
     * the app displays.
     *
     */
    private static function fyd_create_results_page()
    {
        $date = get_the_date('Y-m-d H:i:s');
        $page_template_path = 
            plugins_url('/templates/page-find-your-do-results.php', __FILE__);

        $args = array(
            'post_content' => '',
            'post_title' => 'Find Your DO',
            'post_status' => 'publish',
            'post_type' => 'page',
            'ping_status' => 'closed',
            'post_date' => $date,
            'post_date_gmt' => get_gmt_from_date($date),
            'comment_status' => 'closed',
        );
    
        $post_id = wp_insert_post($args);

        return $post_id;
    }

    /**
     * Clear our entry from the DB.
     *
     */
    private static function fyd_delete_option()
    {
        delete_option('fyd_post_id');
    }
}
