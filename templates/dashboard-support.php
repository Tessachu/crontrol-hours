<div class="au-plugin-support">
    <h2><?php _e('Plugin Support', 'crontrol-hours'); ?></h2>
    <p>
        <?php _e('Enjoying my plugin? Please leave a review!'); ?><br />
        <a class="button button-secondary" href="<?php echo (esc_url($args['external_link_prefix'] . 'write-a-review&redirect=' . urlencode(sprintf('https://wordpress.org/support/plugin/%s/reviews/#new-post', $args['plugin_settings']['slug'])))); ?>" target="_blank" rel="noopener noreferrer nofollow">
            <?php _e('Write a Review', 'crontrol-hours'); ?>
        </a>
    </p>
    <p>
        <?php _e("If you're experiencing issues with this plugin or have a suggestion for a feature or fix, please check the support threads or submit a ticket to give me the opportunity to make it better. I want to help!", 'crontrol-hours'); ?><br />
        <a class="button button-secondary" href="<?php echo (esc_url($args['external_link_prefix'] . 'support-forums&redirect=' . urlencode(sprintf('https://wordpress.org/support/plugin/%s/', $args['plugin_settings']['slug'])))); ?>" target="_blank" rel="noopener noreferrer nofollow">
            <?php _e('Support Forums', 'crontrol-hours'); ?>
        </a>
    </p>
    <p>
        <?php _e('This is a <em>free</em> plugin that I poured a bit of my heart and soul into with the sole purpose of being helpful to you and the users of your WordPress website. Please consider supporting my queer and autistic-led small business by donating! Thank you!', 'crontrol-hours'); ?><br />
    </p>
    <div class="donate-button">
        <a title="<?php _e('Donate', 'crontrol-hours'); ?>" href="<?php echo (esc_url($args['external_link_prefix'] . 'donate&redirect=' . urlencode('https://just1voice.com/donate'))); ?>" target="_blank" rel="noopener noreferrer nofollow">
            <span>
                <img width="20" height="13" src="<?php echo (esc_url($args['plugin_settings']['url'] . 'assets/images/kofi-cup.png')); ?>" alt="<?php _e('Coffee cup', 'crontrol-hours'); ?>" />
                <?php _e('Buy me a Coffee', 'crontrol-hours'); ?>
            </span>
        </a>
    </div>
</div>