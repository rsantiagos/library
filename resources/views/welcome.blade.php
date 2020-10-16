<!DOCTYPE html>
<html lang="en" @if((!cache('direction') && config('config.direction') == 'rtl') || cache('direction') == 'rtl') dir="rtl" @endif>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Multiceras">
        <title>{{env('APP_NAME')}}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <!-- <link rel="shortcut icon" href="/images/favicon.png"> -->
        <link href="{{ mix('/css/app.css') }}" id="direction" rel="stylesheet">
        <link href="{{ mix('/css/style.css') }}" id="direction" rel="stylesheet">
    <body>

        <div id="root">
            <router-view></router-view>
        </div>
        <!-- <script src="/js/lang"></script> -->
        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
