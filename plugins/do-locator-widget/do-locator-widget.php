<?php

/*
 * Plugin Name: DO Locator Widget
 * Plugin URI: http://orbitmedia.com
 * Description: This widget allows for sidebar placement of the DO Locator Tool.
 * Version: 0.1
 * Author: Mark Furrow
 * License: GPL2
 */

class DO_Locator_Widget extends WP_Widget
{
    /**
     * Sets up the widgets name etc
     */
    public function __construct()
    {

        // widget actual processes
        parent::__construct(
            'DO_Locator_Widget', // Base ID
            'DO Locator Form', // Name
            array(
                'description' => __( 'Places DO Locator Tool form.' )
            )
        );

    }

    public function widget( $args, $instance )
    {

        $html = '
            <div class="widget do-locator">
                <h3>Find A DO Today</h3>
                <form id="findYourDo">
                    <input id="specialty" name="q" type="text" placeholder="Name or Specialty">
                    <input id="location" name="location" type="text" placeholder="City, State or Zip">
                    <button>SEARCH <i class="fa fa-angle-double-right"></i></button>
                </form>
            </div>
        ';

        echo $html;

    }

    public function form( $instance ) {

    }

    public function update( $new_instance, $old_instance ) {
         $instance = $old_instance;
         return $instance;
    }


}

// add_action( 'widgets_init', create_function( '', 'return register_widget("DO_Locator_Widget");' ) );

function do_register_widget()
{
    register_widget( 'DO_Locator_Widget' );
}

add_action( 'widgets_init', 'do_register_widget' );
