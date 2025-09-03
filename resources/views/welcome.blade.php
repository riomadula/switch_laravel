<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Switch Laravel</title>

        <!-- VITE -->
        {{-- @vite(['resources/js/app.js', 'resources/sass/app.scss']) --}}
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>

    <body class="antialiased">
        <div id="app"></div>
        <!-- For Vhost <script async defer src="{{ url('/public/js/app.js?'.date('Ymdhis')) }}"></script> -->

         <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
