<?php
$aliasGroups = [
    'game5bce.html' => [
        'tomb of gold ii',
        'tomb-of-gold-ii',
        'tombofgold2',
        'tombofgoldii',
        'slots',
        'game5bce',
    ],
    'game6726.html' => [
        'lion saga odyssey',
        'lion-saga-odyssey',
        'lionsagaodyssey',
        'blackjack',
        'game6726',
    ],
    'game7c52.html' => [
        "leprechaun's diamond dig",
        'leprechauns diamond dig',
        'leprechauns-diamond-dig',
        'leprechaunsdiamonddig',
        'game7c52',
    ],
    'game8c47.html' => [
        'rise of orpheus',
        'rise-of-orpheus',
        'riseoforpheus',
        'roulette',
        'game8c47',
    ],
    'gameb66f.html' => [
        'myth of dead',
        'myth-of-dead',
        'mythofdead',
        'poker',
        'gameb66f',
    ],
    'gameeeac.html' => [
        'beasts of fire maximum',
        'beasts-of-fire-maximum',
        'beastsoffiremaximum',
        'gameeeac',
    ],
];

/**
 * Normalize a game identifier (title, slug, etc.) for consistent lookups.
 */
function normalize_key(?string $value): string
{
    if ($value === null) {
        return '';
    }

    $value = strtolower(trim($value));
    if ($value === '') {
        return '';
    }

    $value = str_replace(['+', '_'], '-', $value);
    $value = preg_replace('/[^a-z0-9-]+/', '-', $value);
    $value = preg_replace('/-+/', '-', $value);

    return trim($value, '-');
}

$lookup = [];
foreach ($aliasGroups as $file => $aliases) {
    $lookup[normalize_key(pathinfo($file, PATHINFO_FILENAME))] = $file;

    foreach ($aliases as $alias) {
        $key = normalize_key($alias);
        if ($key !== '') {
            $lookup[$key] = $file;
        }
    }
}

$candidates = [
    normalize_key($_GET['title'] ?? null),
    normalize_key($_GET['game'] ?? null),
    normalize_key($_GET['slug'] ?? null),
    normalize_key($_GET['id'] ?? null),
];

$target = null;
foreach ($candidates as $candidate) {
    if ($candidate !== '' && isset($lookup[$candidate])) {
        $target = $lookup[$candidate];
        break;
    }
}

if ($target === null) {
    http_response_code(404);
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Game not found</title></head><body><h1>Game not found</h1><p>The requested game could not be located.</p></body></html>';
    exit;
}

$path = __DIR__ . '/' . $target;
if (!is_file($path)) {
    http_response_code(500);
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><h1>Missing game file</h1><p>We could not load the requested game.</p></body></html>';
    exit;
}

readfile($path);
