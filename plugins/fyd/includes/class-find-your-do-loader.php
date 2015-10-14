<?php

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 */
class Find_Your_Do_Loader 
{

    protected $actions;
    protected $filters;

    public function __construct() 
    {

        $this->actions = array();
        $this->filters = array();

    }

    /**
     * Add a new action to the collection to be registered with WordPress.
     *
     * @param      string               $hook             The name of the WordPress action that is being registered.
     * @param      object               $component        A reference to the instance of the object on which the action is defined.
     * @param      string               $callback         The name of the function definition on the $component.
     * @param      int      Optional    $priority         The priority at which the function should be fired.
     * @param      int      Optional    $accepted_args    The number of arguments that should be passed to the $callback.
     */
    public function add_action( $hook, $component, $callback, $priority = 10, 
        $accepted_args = 1 ) 
    {
        $this->actions = $this->add( $this->actions, $hook, $component, $callback, $priority, $accepted_args );
    }

    /**
     * Add a new filter to the collection to be registered with WordPress.
     *
     * @param string $hook          Name of the WordPress filter 
     * @param object $component     Reference to the instance of the 
                                       object on which the filter is defined
     * @param string $callback      Name of the function definition on the $component
     * @param int    $priority      Priority 
     * @param int    $accepted_args Number of args passed to the $callback
     */
    public function add_filter( $hook, $component, $callback, $priority = 10, 
        $accepted_args = 1 ) 
    {
        $this->filters = $this->add(
            $this->filters, 
            $hook, 
            $component, 
            $callback, 
            $priority, 
            $accepted_args 
        );
    }

    /**
     * A utility function that is used to register the actions and hooks into a single
     * collection.
     *
     * @param array  $hooks         Collection of hooks that is being registered 
     * @param string $hook          Name of the WordPress filter that is being registered
     * @param object $component     Reference to the instance of the object on which 
                                        the filter is defined
     * @param string $callback      Name of the function definition on the $component
     * @param int    $priority      Priority at which the function should be fired
     * @param int    $accepted_args Number of arguments that should be passed to the $callback
     * @return type                 Collection of actions and filters registered with WP
     */
    private function add( $hooks, $hook, $component, $callback, $priority, 
        $accepted_args ) 
    {

        $hooks[] = array(
            'hook'          => $hook,
            'component'     => $component,
            'callback'      => $callback,
            'priority'      => $priority,
            'accepted_args' => $accepted_args
        );

        return $hooks;

    }

    public function run() 
    {

        foreach ( $this->filters as $hook ) {
            add_filter( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );
        }

        foreach ( $this->actions as $hook ) {
            add_action( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );
        }

    }

}
