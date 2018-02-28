System.config({
    //use typescript for compilation
    transpiler: 'typescript',
    //typescript compiler options
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    //map tells the System loader where to look for things
    map: {

      'app': './',

      '@angular/core': 'npm:@angular/core@5.2.0/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common@5.2.0/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common@5.2.0/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler@5.2.0/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@5.2.0/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@5.2.0/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'npm:@angular/router@5.2.0/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms@5.2.0/bundles/forms.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser@5.2.0/bundles/platform-browser-animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations@5.2.0/bundles/animations-browser.umd.js',
      '@angular/animations': 'npm:@angular/animations@5.2.0/bundles/animations.umd.js',

      '@angular/cdk/portal': 'npm:@angular/cdk@5.0.4/bundles/cdk-portal.umd.js',
      '@angular/cdk/overlay': 'npm:@angular/cdk@5.0.4/bundles/cdk-overlay.umd.js',
      '@angular/cdk/a11y': 'npm:@angular/cdk@5.0.4/bundles/cdk-a11y.umd.js',
      '@angular/cdk/scrolling': 'npm:@angular/cdk@5.0.4/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/bidi': 'npm:@angular/cdk@5.0.4/bundles/cdk-bidi.umd.js',
      '@angular/cdk/coercion': 'npm:@angular/cdk@5.0.4/bundles/cdk-coercion.umd.js',
      '@angular/cdk/keycodes': 'npm:@angular/cdk@5.0.4/bundles/cdk-keycodes.umd.js',
      '@angular/cdk/platform': 'npm:@angular/cdk@5.0.4/bundles/cdk-platform.umd.js',

      'angular-calendar': 'npm:angular-calendar@0.23.2/bundles/angular-calendar.umd.js',
      'calendar-utils': 'npm:calendar-utils@0.1.0/dist/umd/calendar-utils.js',
      'angular-resizable-element': 'npm:angular-resizable-element@2.0.0/bundles/angular-resizable-element.umd.js',
      'angular-draggable-droppable': 'npm:angular-draggable-droppable@2.0.0/bundles/angular-draggable-droppable.umd.js',
      'date-fns': 'npm:date-fns@1.29.0',
      'positioning': 'npm:positioning@1.3.1/dist/umd/positioning.js',

      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap@1.0.0-beta.9',
      'ngx-contextmenu': 'npm:ngx-contextmenu@4.1.1',
      'rxjs': 'npm:rxjs@5.5.6',
      'rrule': 'npm:rrule@2.2.0',
      'typescript': 'npm:typescript@2.2.2/lib/typescript.js'
    },
    //packages defines our app package
    packages: {
      app: {
        main: './bootstrap.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'date-fns': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ngx-contextmenu': {
        main: './lib/index.js',
        defaultExtension: 'js'
      }
    }
  });
