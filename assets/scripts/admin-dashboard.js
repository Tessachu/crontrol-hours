/*!
    Name: admin-dashboard.js
    Author: AuRise Creative | https://aurisecreative.com
    Last Modified: 2023.03.30.19.39
*/
var $ = jQuery.noConflict(),
    auPluginAdminDashboard = {
        version: '2023.03.01.23.24',
        init: function() {
            //Plugin initialization
            auPluginAdminDashboard.tabs.init();
            auPluginAdminDashboard.forms.init();

            //Custom plugin functionality
            $('.au-plugin form#crontrol-hours-update').on('submit', auPluginAdminDashboard.updateHours.start);

            //Init complete, display admin UI
            auPluginAdminDashboard.initComplete();
        },
        initComplete: function() {
            //If there is a Hash in the URL, open that tab
            let current_tab = document.location.hash;
            if (current_tab && $(current_tab).length) {
                //open the current tab
                auPluginAdminDashboard.tabs.open(current_tab.replace('#', ''));
            } else {
                //open first tab
                auPluginAdminDashboard.tabs.open($('.au-plugin a.nav-tab').first().attr('href').replace('#', ''));
            }
            //init is completed. Hide loading spinner image and display the admin UI
            $('.au-plugin .au-plugin-admin-ui>.progress-spinner').addClass('hide');
            $('.au-plugin .admin-ui').removeClass('hide');
        },
        tabs: {
            init: function() {
                //Hide all tabs
                $('.au-plugin section.tab').addClass('hide');

                //Add button listeners
                var $btns = $('.au-plugin a.nav-tab');
                $btns.on('click', auPluginAdminDashboard.tabs.handler);
                if ($btns.length === 1) {
                    //If there's only one tab, hide them
                    $('.au-plugin .nav-tab-wrapper').addClass('hide');
                }
            },
            handler: function(event) {
                event.preventDefault();
                var tab = $(this).attr('href').replace('#', '');
                auPluginAdminDashboard.tabs.open(tab);
            },
            open: function(tab) {
                $('.au-plugin a.nav-tab, .au-plugin #tab-content section.tab').removeClass('nav-tab-active'); //Deactivate all of the tab buttons and tab contents
                $('.au-plugin #tab-content section.tab').addClass('hide'); //Hide all of the tab contents
                $('.au-plugin #' + tab).removeClass('hide').addClass('nav-tab-active'); //Show and activate the tab content
                $('.au-plugin #open-' + tab).addClass('nav-tab-active'); //Activate the tab button
            }
        },
        forms: {
            init: function() {
                auPluginAdminDashboard.forms.initSwitches();
            },
            initSwitches: function() {
                //Add checkbox listeners for switch toggles
                var $checkboxes = $('.au-plugin input[type="hidden"]+input[type="checkbox"]');
                if ($checkboxes.length) {
                    $('.au-plugin input[type="hidden"]+input[type="checkbox"]').on('click', auPluginAdminDashboard.forms.switchHandler);
                }
            },
            switchHandler: function(e) {
                //Updates the hidden field with the boolean value of the checkbox
                var $input = $(this),
                    checked = $input.is(':checked') || $input.prop('checked');
                if ($input.hasClass('reverse-checkbox')) {
                    //Reverse checkboxes show a positive association with the "false" value
                    $input.siblings('input[type="hidden"]').val(checked ? '0' : '1');
                } else {
                    $input.siblings('input[type="hidden"]').val(checked ? '1' : '0');
                }
                // Exclusive switches
                if (checked) {
                    var input_name = $(this).attr('name'),
                        force_daily = input_name.indexOf('force_daily') > -1,
                        restrict_frequent = input_name.indexOf('restrict_frequent') > -1;
                    if (force_daily) {
                        // Uncheck restrict frequent
                        auPluginAdminDashboard.forms.toggleCheckbox('#crontrol_hours_restrict_frequent_check', false);
                    } else if (restrict_frequent) {
                        // Uncheck force daily
                        auPluginAdminDashboard.forms.toggleCheckbox('#crontrol_hours_force_daily_check', false);
                    }
                }
            },
            toggleCheckbox: function(input, passedValue) {
                //Changes a checkbox input to be checked or unchecked based on boolean parameter (or toggles if not included)
                //Only changes it visually - it does not change any data in any objects
                var $input = $(input);
                var value = passedValue;
                if (typeof(value) != 'boolean' || value === undefined) {
                    value = !auPluginAdminDashboard.forms.controlledFields.getCheckbox($input);
                }
                if (value) {
                    $input.attr('checked', 'checked');
                    $input.prop('checked', true);
                    var $hidden = $input.siblings('input[type="hidden"]');
                    // Also update the hidden value if this checkbox is a toggle switch
                    if ($hidden.length) {
                        if ($input.hasClass('reverse-checkbox')) {
                            //Reverse checkboxes show a positive association with the "false" value
                            $hidden.val(value ? '0' : '1');
                        } else {
                            $hidden.val(value ? '1' : '0');
                        }
                    }
                } else {
                    $input.removeAttr('checked');
                    $input.prop('checked', false);
                    // Also update the hidden value if this checkbox is a toggle switch
                    var $hidden = $input.siblings('input[type="hidden"]');
                    if ($hidden.length) {
                        if ($input.hasClass('reverse-checkbox')) {
                            //Reverse checkboxes show a positive association with the "false" value
                            $hidden.val(value ? '0' : '1');
                        } else {
                            $hidden.val(value ? '1' : '0');
                        }
                    }
                }
            }
        },
        updateHours: {
            start: function(e) {
                e.preventDefault();
                auPluginAdminDashboard.updateHours.toggleFormStatus(true); //Disable the form
                $('.au-plugin form#crontrol-hours-update .form-response-output').html('').addClass('hide'); //Clear out and hide old response
                var form_data = $(this).serialize();
                console.info('Submitting form data', form_data);
                //$('#generate-status').attr('class', 'status-text notice notice-info hide');
                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: au_dashboard.ajax_url,
                        data: {
                            'action': 'crontrol_hours_update', //name of handle after "wp_ajax_" prefix
                            'fields': form_data
                        },
                        cache: false,
                        error: function(xhr) {
                            //console.error('AJAX Error', xhr);
                            auPluginAdminDashboard.updateHours.complete({
                                'success': 0,
                                'error': xhr,
                                'output': xhr.responseText + ' Error: Ajax Error'
                            });
                        },
                        success: function(response) {
                            //console.info('AJAX Success', response);
                            try {
                                response = JSON.parse(response);
                                setTimeout(function() {
                                    auPluginAdminDashboard.updateHours.complete(response);
                                }, 500);
                            } catch (xhr) {
                                auPluginAdminDashboard.updateHours.complete({
                                    'success': 0,
                                    'error': xhr,
                                    'response': response,
                                    'output': xhr.responseText + ' Error: JSON Error'
                                });
                            }
                        }
                    });
                }, 50);
            },
            toggleFormStatus(toggle) {
                var $form = $('.au-plugin form#crontrol-hours-update'),
                    $btn = $('.au-plugin form#crontrol-hours-update [type="submit"]'),
                    $spinner = $('.au-plugin form#crontrol-hours-update .progress-spinner');
                if (toggle) {
                    //Disable the form
                    $form.attr('disabled', 'disabled');
                    $btn.attr('disabled', 'disabled');
                    $spinner.removeClass('hide');
                } else {
                    //Enable the form
                    $form.removeAttr('disabled');
                    $btn.removeAttr('disabled');
                    $spinner.addClass('hide');
                }
            },
            complete(response) {
                //console.log('Update CRON Events complete', response);
                auPluginAdminDashboard.updateHours.toggleFormStatus(false); //Enable the form
                if (response.output) {
                    $('.au-plugin form#crontrol-hours-update .form-response-output').html(response.output).removeClass('hide');
                }
            }
        }
    };
$(document).ready(auPluginAdminDashboard.init);