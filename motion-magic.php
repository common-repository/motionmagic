<?php

if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/*
Plugin Name: MotionMagic
Author: guelben
Text Domain: motion-magic
Description: Enhance Gutenberg with beautifull animations (on scroll, on hover and on click). Works with any block, new or premade. Commpatible with any block plugins: spectra, Toolset, Stackable, genesis ultimate...
Requires PHP: 5.3
Domain Path: /languages
Version: 1.0
Author URI: https://www.guelbetech.com/
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

if ( !function_exists( 'motion_magic_fs' ) ) {
    // Create a helper function for easy SDK access.
    function motion_magic_fs()
    {
        global  $motion_magic_fs ;
        
        if ( !isset( $motion_magic_fs ) ) {
            // Include Freemius SDK.
            require_once dirname( __FILE__ ) . '/freemius/start.php';
            $motion_magic_fs = fs_dynamic_init( array(
                'id'             => '12277',
                'slug'           => 'motionmagic',
                'type'           => 'plugin',
                'public_key'     => 'pk_c9ce213dee70c9f5b07de22a32222',
                'is_premium'     => false,
                'has_addons'     => false,
                'has_paid_plans' => true,
                'trial'          => array(
                'days'               => 10,
                'is_require_payment' => true,
            ),
                'menu'           => array(
                'slug'       => 'motion_magic_menu_page',
                'first-path' => 'admin.php?page=motion_magic_getting_started',
                'support'    => false,
            ),
                'is_live'        => true,
            ) );
        }
        
        return $motion_magic_fs;
    }
    
    // Init Freemius.
    motion_magic_fs();
    // Signal that SDK was initiated.
    do_action( 'motion_magic_fs_loaded' );
}

// Hook into the 'wp_footer' action to modify the page content
//add_filter('the_content', 'add_data_aos_attribute');
if ( get_option( 'motion_magic_duration' ) == false ) {
    update_option( 'motion_magic_duration', '1000' );
}
if ( get_option( 'motion_magic_easing' ) == false ) {
    update_option( 'motion_magic_easing', 'ease' );
}
if ( get_option( 'motion_magic_disable' ) == false ) {
    update_option( 'motion_magic_disable', '0' );
}
if ( get_option( 'motion_magic_easing' ) == false ) {
    update_option( 'motion_magic_easing', 'ease' );
}
add_action( "wp_enqueue_scripts", "motion_magic_enqueue" );
if ( !function_exists( 'motion_magic_enqueue' ) ) {
    function motion_magic_enqueue()
    {
        wp_enqueue_style(
            "aos-style",
            plugin_dir_url( __FILE__ ) . "css/aos.css",
            array(),
            "1.0",
            "(min-width:" . get_option( "motion_magic_disable" ) . "px)"
        );
        wp_enqueue_style(
            "micron-style",
            plugin_dir_url( __FILE__ ) . "css/micron.css",
            array(),
            time()
        );
        wp_enqueue_style(
            "kito-style",
            plugin_dir_url( __FILE__ ) . "css/kito.css",
            array(),
            time()
        );
        wp_enqueue_script(
            "aos-js",
            plugin_dir_url( __FILE__ ) . "js/aos.js",
            array(),
            "6.1.1",
            true
        );
        wp_enqueue_script(
            "micron-js",
            plugin_dir_url( __FILE__ ) . "js/micron.js",
            array(),
            "6.23",
            true
        );
        wp_enqueue_script(
            "main-js",
            plugin_dir_url( __FILE__ ) . "js/main.js",
            array( 'aos-js' ),
            "1.4",
            true
        );
        $once = true;
        $disable = false;
        
        if ( motion_magic_fs()->is_plan( "business" ) ) {
            
            if ( get_option( "motion_magic_repeat" ) == "no" ) {
                $once = true;
            } else {
                $once = false;
            }
            
            
            if ( get_option( "motion_magic_disable" ) == "false" ) {
                $disable = false;
            } else {
                $disable = get_option( "motion_magic_disable" );
            }
        
        }
        
        $datos = [
            "ease"     => get_option( "motion_magic_easing", "ease" ),
            "duration" => get_option( "motion_magic_duration", "1000" ),
            "once"     => $once,
            "disable"  => $disable,
        ];
        wp_localize_script( "main-js", "objeto", $datos );
    }

}
add_action( "admin_enqueue_scripts", "motion_magic_enqueue_admin" );
if ( !function_exists( 'motion_magic_enqueue_admin' ) ) {
    function motion_magic_enqueue_admin()
    {
        wp_enqueue_style( "aos-style", plugin_dir_url( __FILE__ ) . "css/aos.css" );
        wp_enqueue_style( "micron-style", plugin_dir_url( __FILE__ ) . "css/micron.css" );
        //wp_enqueue_script("jquery");
        wp_enqueue_script( "aos-js", plugin_dir_url( __FILE__ ) . "js/aos.js" );
        wp_enqueue_script(
            "micron-js",
            plugin_dir_url( __FILE__ ) . "js/micron.js",
            "6.23",
            true
        );
        wp_enqueue_style( "kito-style", plugin_dir_url( __FILE__ ) . "css/kito.css" );
        wp_enqueue_style( "admin-style", plugin_dir_url( __FILE__ ) . "css/admin.css" );
        wp_enqueue_script(
            "admin-js",
            plugin_dir_url( __FILE__ ) . "js/admin.js",
            array(),
            "2.0",
            true
        );
        
        if ( motion_magic_fs()->is_not_paying() ) {
            $suffix = " (preview only, upgrade)";
        } else {
            $suffix = "";
        }
        
        $datos = [
            "titulo"          => __( "Animations by MotionMagic", "motion-magic" ),
            "label_animation" => __( "Animation", "motion-magic" ),
            "label_duration"  => __( "Duration", "motion-magic" ),
            "label_effect"    => __( "Effect", "motion-magic" ),
            "label_easing"    => __( "Easing", "motion-magic" ),
            "ease"            => get_option( "motion_magic_easing", "ease" ),
            "duration"        => get_option( "motion_magic_duration", "1000" ),
            "suffix"          => $suffix,
        ];
        wp_localize_script( "admin-js", "objeto", $datos );
    }

}
if ( !function_exists( 'motion_magic_add_data_aos_attribute' ) ) {
    function motion_magic_add_data_aos_attribute( $block_content, $block )
    {
        //return $block_content;
        $block_content = str_replace( "aos-init", "", $block_content );
        $block_content = str_replace( "aos-animate", "", $block_content );
        $effect1 = [
            'none',
            'fade',
            'fade-up',
            'fade-down',
            'fade-right',
            'fade-left',
            'fade-up-right',
            'fade-up-left',
            'fade-down-right',
            'fade-down-left'
        ];
        $duration1 = [
            '',
            '250',
            '500',
            '750',
            '1000'
        ];
        $easing1 = [
            '',
            'linear',
            'ease',
            'ease-in'
        ];
        $hover = [
            'none',
            'grow',
            'shrink',
            'push'
        ];
        $click = [
            'none',
            'shake',
            'fade',
            'jelly'
        ];
        
        if ( isset( $block['attrs']['className'] ) && strpos( " " . $block['attrs']['className'] . " ", 'magic-' ) !== false ) {
            //extract vector
            $array1 = explode( "magic-", $block_content );
            $array2 = explode( " ", $array1[1] );
            $vector = $array2[0];
            //scroll effect
            $target = ord( $vector[0] ) - 65;
            
            if ( $target != 0 and isset( $effect1[$target] ) ) {
                $valor = $effect1[$target];
                $array1 = explode( "class=", $block_content );
                $array1[0] = $array1[0] . "data-aos='{$valor}' ";
                $block_content = implode( "class=", $array1 );
            }
            
            //duration
            $target = ord( $vector[1] ) - 65;
            
            if ( $target != 0 and isset( $duration1[$target] ) ) {
                $valor = $duration1[$target];
                $array1 = explode( "class=", $block_content );
                $array1[0] = $array1[0] . "data-duration='{$valor}' ";
                $block_content = implode( "class=", $array1 );
            }
            
            //easing
            $target = ord( $vector[2] ) - 65;
            
            if ( $target != 0 and isset( $easing1[$target] ) ) {
                $valor = $easing1[$target];
                $array1 = explode( "class=", $block_content );
                $array1[0] = $array1[0] . "data-ease='{$valor}' ";
                $block_content = implode( "class=", $array1 );
            }
            
            //hover
            $target = ord( $vector[3] ) - 65;
            
            if ( $target != 0 and isset( $hover[$target] ) ) {
                $valor = $hover[$target];
                $array1 = explode( 'class="', $block_content );
                $array1[1] = "kocka kito-" . $valor . " " . $array1[1];
                $block_content = implode( 'class="', $array1 );
            }
            
            //click
            $target = ord( $vector[4] ) - 65;
            
            if ( $target != 0 and isset( $click[$target] ) ) {
                $valor = $click[$target];
                $array1 = explode( "class=", $block_content );
                $array1[0] = $array1[0] . "data-micron='{$valor}' ";
                $block_content = implode( "class=", $array1 );
            }
            
            $array1 = explode( "class=", $block_content );
            $array1[0] = $array1[0] . "data-block='1' ";
            $block_content = implode( "class=", $array1 );
        }
        
        return $block_content;
    }

}
add_filter(
    'render_block',
    'motion_magic_add_data_aos_attribute',
    10,
    2
);
add_action( 'admin_init', 'motion_magic_register_settings' );
if ( !function_exists( "motion_magic_register_settings" ) ) {
    function motion_magic_register_settings()
    {
        register_setting( 'motion_magic_settings-group', 'motion_magic_duration' );
        register_setting( 'motion_magic_settings-group', 'motion_magic_easing' );
        register_setting( 'motion_magic_settings-group', 'motion_magic_repeat' );
        register_setting( 'motion_magic_settings-group', 'motion_magic_disable' );
    }

}
add_action( 'admin_menu', 'motion_magic_add_pages' );
if ( !function_exists( "motion_magic_add_pages" ) ) {
    function motion_magic_add_pages()
    {
        add_menu_page(
            'Motion Magic',
            'Motion Magic',
            'manage_options',
            'motion_magic_menu_page',
            'motion_magic_page_callback',
            'data:image/svg+xml;base64,' . base64_encode( '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M496 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm-304-64l-64-32 64-32 32-64 32 64 64 32-64 32-16 32h208l-86.41-201.63a63.955 63.955 0 0 1-1.89-45.45L416 0 228.42 107.19a127.989 127.989 0 0 0-53.46 59.15L64 416h144l-16-32zm64-224l16-32 16 32 32 16-32 16-16 32-16-32-32-16 32-16z"/></svg>' )
        );
        add_submenu_page(
            'motion_magic_menu_page',
            'Getting Started',
            'Getting Started',
            'manage_options',
            'motion_magic_getting_started',
            'motion_magic_getting_started'
        );
    }

}
if ( !function_exists( "motion_magic_getting_started" ) ) {
    function motion_magic_getting_started()
    {
        ?>
    <div class="mm_container">
    <div class="mm_logo_container"><img width='100' src='<?php 
        echo  esc_url( plugin_dir_url( __FILE__ ) ) ;
        ?>/img/buho_br.png' ></div>
    <h1><?php 
        esc_html_e( "Welcome to MotionMagic", "motion-magic" );
        ?></h1>
    <p class="mm_agrad"><?php 
        esc_html_e( "Thank you for choosing MotionMagic, the easiest way to add beautifull css animations to any Gutenberg block.", "motion-magic" );
        ?></p>
    
        <div class="mm_sub_container">
        <div class="mm_list">
        <h2 class="mm_list_h2" ><?php 
        esc_html_e( "How to get started?", "motion-magic" );
        ?></h2>
            <ol class="mm_ol">
                <li><?php 
        esc_html_e( "Inspect Any Block", "motion-magic" );
        ?></li>
                <li><?php 
        esc_html_e( "Toggle the MotionMagic Panel", "motion-magic" );
        ?></li>
                <li><?php 
        esc_html_e( "Enjoy!", "motion-magic" );
        ?></li>
            </ol>
        </div><div class="mm_img-cont" ><img width='650' class="mm_img"src='<?php 
        echo  esc_url( plugin_dir_url( __FILE__ ) ) ;
        ?>/img/tuto_motion.png' ></div></div>
    </div>
    <?php 
    }

}
if ( !function_exists( "motion_magic_page_callback" ) ) {
    function motion_magic_page_callback()
    {
        $duration = get_option( "motion_magic_duration" );
        $easing = get_option( "motion_magic_easing", "ease" );
        $disable = get_option( "motion_magic_disable", "false" );
        $repeat = get_option( "motion_magic_repeat", "false" );
        ?>
<div id="wrap">

  <h2> <?php 
        esc_html_e( "Default settings", "motion-magic" );
        ?></h2>
  <form action="options.php" method="post">
  <?php 
        settings_fields( 'motion_magic_settings-group' );
        ?>
    <?php 
        do_settings_sections( 'motion_magic_settings-group' );
        ?>
<table class="form-table">
  <tbody>
  <tr><th scope="row">
    <label for="motion_magic_duration"><?php 
        esc_html_e( "Animation On Scroll Duration (ms):", "motion-magic" );
        ?></label>
     </th>
  <td>

    <select name="motion_magic_duration">
 
 <option <?php 
        if ( $duration == "250" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="250">250</option>
 <option <?php 
        if ( $duration == "500" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="500">500</option>
 <option <?php 
        if ( $duration == "750" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="750">750</option>
 <option <?php 
        if ( $duration == "1000" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="1000">1000</option>
 <?php 
        ?>
</select> </td>
    </tr>
    <tr>
<th scope="row">
  
    <label for="motion_magic_easing"> <?php 
        esc_html_e( "On Scroll Effect Easing:", "motion-magic" );
        ?></label>
    </th>
    <td>
    <select name="motion_magic_easing">
    <option <?php 
        if ( $easing == "ease" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="linear">linear</option>
<option <?php 
        if ( $easing == "ease" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="ease">ease</option>
<option <?php 
        if ( $easing == "ease-in" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="ease-in">ease in</option>
<option <?php 
        if ( $easing == "ease-out" ) {
            echo  esc_html( "selected='selected'" ) ;
        }
        ?>  value="ease-out">ease out</option>
<?php 
        ?>
</select>
  </td></tr>
<?php 
        ?>
  </tbody>
    </table>
  </table>

    <?php 
        submit_button();
        ?> 
  </form>
</div>

<?php 
    }

}

if ( !function_exists( "motion_magic_inline_css" ) ) {
    add_action( "admin_head", "motion_magic_inline_css" );
    function motion_magic_inline_css()
    {
        ?>

<style>
  .selectControlClass, .durationControlClass, .selectControl2Class, .easingControlClass, .tipoControlClass, .selectControl3Class {
    display:none;
  }
</style>

      <?php 
    }

}
