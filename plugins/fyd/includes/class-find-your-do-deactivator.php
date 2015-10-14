<?php

class Find_Your_Do_Deactivator 
{

    public static function deactivate() 
    {
        $post_id = self::fyd_get_post_id();

        if ($post_id) {
            wp_delete_post($post_id, true);
            self::fyd_delete_option();
        }
    }

    /**
     * Clear our entry from the DB.
     *
     */
    private static function fyd_delete_option()
    {
        delete_option('fyd_post_id');
    }

    private static function fyd_get_post_id()
    {
        $post_id = get_option('fyd_post_id');
        return $post_id;
    }

}
