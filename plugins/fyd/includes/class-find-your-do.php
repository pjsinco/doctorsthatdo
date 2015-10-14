<?php

class Find_Your_Do 
{

    protected $loader;
    protected $plugin_name;
    protected $version;
    protected $results_post_id;

    public function __construct($results_post_id) 
    {

        $this->results_post_id = $results_post_id;
        $this->plugin_name = 'find-your-do';
        $this->version = '1.0.0';

        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_public_hooks();

    }

    /**
     * Load the required dependencies for this plugin.
     *
     * - Find_Your_Do_Loader. Orchestrates the hooks of the plugin.
     * - Find_Your_Do_Admin. Defines all hooks for the admin area.
     * - Find_Your_Do_Public. Defines all hooks for the public side of the site.
     *
     */
    private function load_dependencies() 
    {

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 
            'includes/class-find-your-do-loader.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 
            'admin/class-find-your-do-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 
            'public/class-find-your-do-public.php';

        $this->loader = new Find_Your_Do_Loader();

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     */
    private function define_admin_hooks() 
    {

        //$plugin_admin = 
            //new Find_Your_Do_Admin( $this->get_plugin_name(), $this->get_version() );

        //$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        //$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     */
    private function define_public_hooks() 
    {

        $plugin_public = new Find_Your_Do_Public( 
            $this->get_plugin_name(), 
            $this->get_version(), 
            $this->results_post_id 
        );

        $this->loader->add_action(
            'wp_enqueue_scripts', 
            $plugin_public, 
            'enqueue_styles' 
        );

        $this->loader->add_action(
            'wp_enqueue_scripts', 
            $plugin_public, 
            'enqueue_scripts'
        );

//        $this->loader->add_filter(
//            'the_title',
//            $plugin_public,
//            'remove_the_title',
//            10,
//            2 
//        );

//        $this->loader->add_filter(
//            'the_content',
//            $plugin_public,
//            'add_results_divs',
//            10,
//            1
//        );

        $this->loader->add_filter(
            'wp_footer',
            $plugin_public,
            'add_js_templates',
            10,
            1
        );

        $this->loader->add_action(
            'get_sidebar',
            $plugin_public,
            'add_map_block',
            1
        );

//        $this->loader->add_filter(
//            'is_active_sidebar',
//            $plugin_public,
//            'say_yes_to_is_active_sidebar',
//            10,
//            1
//        );

        $this->loader->add_filter(
            'page_template',
            $plugin_public,
            'fyd_load_page_template',
            10,
            1
        );

    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     */
    public function run() 
    {
        $this->loader->run();
    }

    /**
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name() 
    {
        return $this->plugin_name;
    }

    /**
     * @return    Find_Your_Do_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader() 
    {
        return $this->loader;
    }

    /**
     * @return    string    The version number of the plugin.
     */
    public function get_version() 
    {
        return $this->version;
    }

}
