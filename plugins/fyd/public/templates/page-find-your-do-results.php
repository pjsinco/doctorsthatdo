<?php get_header(); ?>

<?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>

        <div id="interior">

            <div class="container-fluid">

                <?php include plugin_dir_path(__FILE__) . 'find-your-do-form.php'; ?>

                <div class="hasRightCol interior-content">

                    <div id="right">

                        <div class="row">

                            <div id="content" class="mainContent">

                                <div class="entry facetwp-template">
                                <?php the_content(); ?>
                                </div> <!-- .entry -->

                            </div> <!-- #content -->

                            <?php
                                //RIGHT
                                get_sidebar('sidebar-fyd-results');
                            ?>

                        </div> <!-- .row -->

                    </div> <!-- #right  -->

                </div> <!-- hasRightCol.interior-content -->

            </div> <!-- .container-fluid -->

        </div> <!-- #interior -->

    <?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>

