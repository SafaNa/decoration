<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="{{ $theme === 'elegant' ? 'dark' : '' }}">
<!-- Removed class="light" as theme handles it -->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <title>Kado Wisuda - Premium Graduation Gifts</title>
    <link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}">

    <!-- Open Graph / WhatsApp Preview -->
    @if(isset($product))
        <meta property="og:type" content="product" />
        <meta property="og:title" content="{{ $product->name }}" />
        <meta property="og:description"
            content="{{ Str::limit($product->description, 100) }} - Rp {{ number_format($product->price, 0, ',', '.') }}" />
        <meta property="og:image" content="{{ $product->image }}" />
        <meta property="og:url" content="{{ url()->current() }}" />
    @else
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kado Wisuda - Premium Graduation Gifts" />
        <meta property="og:description" content="Temukan hadiah wisuda terbaik untuk momen spesial." />
        <meta property="og:image" content="{{ asset('images/logo.png') }}" />
    @endif

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;600&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet" />

    <!-- Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body
    class="bg-background-light dark:bg-background-dark text-[#1b0e14] dark:text-gray-100 overflow-x-hidden antialiased"
    data-theme="{{ $theme ?? 'minimalist' }}">
    <div id="app"></div>
</body>

</html>