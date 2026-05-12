const BPercentage = document.querySelector('.Bpercentage');
const BStatus = document.querySelector('.Bstatus');
const BLiquid = document.querySelector('.Bliquid');

navigator.getBattery().then((battery))=> {

    function updateBattery() {
        /* Battery level*/
        let level = Math.floor(battery.level * 100);
        BPercentage.innerHTML = `${level}`;
        BLiquid.style.height = `${level}%`;
        BLiquid.classList.remove(
            'gradient-color-red',
            'gradient-color-orange',
            'gradient-color-yellow',
            'gradient-color-green'
        );


    }
}