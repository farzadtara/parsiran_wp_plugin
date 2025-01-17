<?php

/**
 * Plugin Name: پاسیران
 * Plugin URI: http://wpminers.com/
 * Description: مدیریت محصولات 
 * Author URI: http://hasanuzzaman.com/
 * Version: 1.0.5
 */
define('WPM_URL', plugin_dir_url(__FILE__));
define('WPM_DIR', plugin_dir_path(__FILE__));

define('WPM_VERSION', '1.0.5');

class WPPluginWithVueTailwind {
    public function boot()
    {
        $this->loadClasses();
        $this->registerShortCodes();
        $this->ActivatePlugin();
        $this->renderMenu();
    }

    public function loadClasses()
    {
        require WPM_DIR . 'includes/autoload.php';
    }

    public function renderMenu()
    {
        add_action('admin_menu', function () {
            if (!current_user_can('manage_options')) {
                return;
            }
            global $submenu;
            add_menu_page(
                'پاسیران',
                'مدیریت محصولات پاسیران',
                'manage_options',
                'wpp-plugin-with-vue-tailwind.php',
                array($this, 'renderAdminPage'),
                'dashicons-superhero-alt',
                25
            );
            // $submenu['wpp-plugin-with-vue-tailwind.php']['dashboard'] = array(
            //     'Dashboard',
            //     'manage_options',
            //     'admin.php?page=wpp-plugin-with-vue-tailwind.php#/',
            // );
            $submenu['wpp-plugin-with-vue-tailwind.php']['categories'] = array(
                'دسته بندی ها',
                'manage_options',
                'admin.php?page=wpp-plugin-with-vue-tailwind.php#/categories',
            );
            $submenu['wpp-plugin-with-vue-tailwind.php']['manageMent'] = array(
                'مدیربت',
                'manage_options',
                'admin.php?page=wpp-plugin-with-vue-tailwind.php#/management',
            );
        });
    }

    public function renderAdminPage()
    {
        wp_enqueue_script('WPWVT-script-boot', WPM_URL . 'assets/admin/js/start.js', array('jquery'), WPM_VERSION, false);
        wp_localize_script( 'WPWVT-script-boot', 'wpPermissionData', array('isAdmin' => current_user_can( 'administrator' )));
        wp_enqueue_style('WPWVT-global-styling', WPM_URL . 'assets/css/element.css', array(), WPM_VERSION);
        wp_enqueue_style( 'load-fa', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css' );
        wp_enqueue_style( 'shabnam', 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@5.0.1/dist/font-face.css');

        $WPWVT = apply_filters('WPWVT/admin_app_vars', array(
            //'image_upload_url' => admin_url('admin-ajax.php?action=wpf_global_settings_handler&route=wpf_upload_image'),
            'assets_url' => WPM_URL . 'assets/',
            'ajaxurl' => admin_url('admin-ajax.php')
        ));

        wp_localize_script('WPWVT-script-boot', 'WPWVTAdmin', $WPWVT);

        echo '<div class="WPWVT-admin-page mt-2" id="WPWVT_app">
        </div>';
        // echo '<div class="WPWVT-admin-page mt-2" id="WPWVT_app">
        //     <router-view></router-view>
        // </div>';
    }


    //            <div class="main-menu text-white-200 bg-wheat-600 p-4">
            //     <router-link to="/">
            //         Home
            //     </router-link> |
            //     <router-link to="/contact" >
            //         Contact
            //     </router-link>
            // </div>
            // <hr/>
    // 
    // 

    public function registerShortCodes()
    {
        // your shortcode here


        add_shortcode('wpParsiran', 'render_app');

        function render_app(){



            $output = '<div class="WPWVT-admin-page mt-2 short_code_wrapper" id="WPWVT_app">';
            // $output .= '<router-view></router-view>';
            $output .= '</div>';

            return $output;


            // echo "<script>console.log('Debug Objects: " . $output . "', $current_user  );</script>";

        }

        function enqueueScripts(){
            if (!wp_script_is('WPWVT-script-boot', 'enqueued')) {
                // wp_enqueue_script('my-script-handle', get_template_directory_uri() . '/js/my-script.js', array('jquery'), null, true);
                wp_enqueue_script('WPWVT-script-boot', WPM_URL . 'assets/admin/js/start.js', array('jquery'), WPM_VERSION, false);
                wp_localize_script( 'WPWVT-script-boot', 'wpPermissionData', array('isAdmin' => current_user_can( 'administrator' )));
            }
        
            if (!wp_style_is('WPWVT-global-styling', 'enqueued') && !wp_style_is('load-fa', 'enqueued') && !wp_style_is('shabnam', 'enqueued')) {
                // wp_enqueue_style('my-style-handle', get_template_directory_uri() . '/css/my-style.css');
                wp_enqueue_style('WPWVT-global-styling', WPM_URL . 'assets/css/element.css', array(), WPM_VERSION);
                wp_enqueue_style( 'load-fa', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css' );
                wp_enqueue_style( 'shabnam', 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@5.0.1/dist/font-face.css');
            }





        }

        add_action( 'wp_enqueue_scripts', 'enqueueScripts' );

    }

    public function ActivatePlugin()
    {
        //activation deactivation hook
        register_activation_hook(__FILE__, function ($newWorkWide) {
            require_once(WPM_DIR . 'includes/Classes/Activator.php');
            $activator = new \WPPluginWithVueTailwind\Classes\Activator();
            $activator->migrateDatabases($newWorkWide);
        });
    }
}

(new WPPluginWithVueTailwind())->boot();



