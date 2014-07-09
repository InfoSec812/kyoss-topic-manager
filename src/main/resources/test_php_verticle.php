<?php

// Woohoo!!! PHP Verticle!!

$id = Vertx::setPeriodic(1000, function($id) {
    $eventBus = Vertx::eventBus();
    $logger = Vertx::logger();
    $logger->info('Sending update from PHP');
    $eventBus->publish('server.client.php.update', time());
});

?>