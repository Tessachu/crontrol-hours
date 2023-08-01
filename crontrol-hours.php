<?php

/**
 * Plugin Name: Crontrol Hours
 * Description: Take control of your CRON jobs by restricting them to your website's low traffic hours.
 * Version: 2.0.0
 * Author: AuRise Creative
 * Author URI: https://aurisecreative.com/
 * Plugin URI: https://aurisecreative.com/crontrol-hours/
 * License: GPL v3
 * Requires at least: 5.8
 * Requires PHP: 5.6.20
 * Text Domain: crontrol-hours
 * Domain Path: /languages/
 *
 * @package AuRise\Plugin\CrontrolHours
 * @copyright Copyright (c) 2023, AuRise Creative - support@aurisecreative.com
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License, version 3 or higher
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

defined('ABSPATH') || exit; // Exit if accessed directly

// Define root file
defined('CRONTROLHOURS_FILE') || define('CRONTROLHOURS_FILE', __FILE__);

// Define plugin version
defined('CRONTROLHOURS_VERSION') || define('CRONTROLHOURS_VERSION', '2.0.0');

// Load the utilities class: AuRise\Plugin\CrontrolHours\Utilities
require_once('includes/class-utilities.php');

// Load the settings class: AuRise\Plugin\CrontrolHours\Settings
require_once('includes/class-settings.php');

// Load the main plugin class: AuRise\Plugin\CrontrolHours\Main
require_once('includes/class-main.php');
