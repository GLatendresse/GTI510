(function (app) {
  'use strict';

  app.registerModule('groups', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('groups.routes', ['ui.router', 'core.routes']);
  app.registerModule('groups.services');
}(ApplicationConfiguration));
