<?php

$eventBus = Vertx::eventBus();

Vertx::setPeriodic(1000, function() use ($eventBus) {
  $eventBus->publish('server.client.php.message', );
});

?>