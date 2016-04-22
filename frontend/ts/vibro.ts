navigator['vibrate'] = navigator['vibrate'] ||
    navigator['webkitVibrate'] ||
    navigator['mozVibrate'] ||
    navigator['msVibrate'];

export default function (ms: number) {
    if (navigator['vibrate'])
        navigator['vibrate'](ms);
}