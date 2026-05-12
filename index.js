const BPercentage = document.querySelector('.Bpercentage');
const BStatus = document.querySelector('.Bstatus');
const BLiquid = document.querySelector('.Bliquid');

async function batteryInit() {

    /* Check API Support */
    if (!navigator.getBattery) {
        BPercentage.innerHTML = 'API';
        BStatus.innerHTML = 'Battery API Not Supported';
        return;
    }

    const battery = await navigator.getBattery();

    function updateBattery() {

        /* Battery Level */
        const level = Math.floor(battery.level * 100);

        BPercentage.innerHTML = `${level}%`;

        /* Battery Height */
        BLiquid.style.height = `${level}%`;

        /* Remove Old Classes */
        BLiquid.classList.remove(
            'gradient-color-red',
            'gradient-color-orange',
            'gradient-color-yellow',
            'gradient-color-green'
        );

        BPercentage.classList.remove(
            'animated-green',
            'animated-red',
            'green-color'
        );

        /* Battery Colors */
        if (level <= 20) {
            BLiquid.classList.add('gradient-color-red');

        } else if (level <= 48) {
            BLiquid.classList.add('gradient-color-orange');

        } else if (level <= 80) {
            BLiquid.classList.add('gradient-color-yellow');

        } else {
            BLiquid.classList.add('gradient-color-green');
            BPercentage.classList.add('green-color');
        }

        /* Charging Status */
        if (battery.charging) {

            BStatus.innerHTML = `
                <i class="ri-flashlight-fill animated-green"></i>
                Charging
            `;

            BPercentage.classList.add('animated-green');

        } else {

            BStatus.innerHTML = `
                <i class="ri-battery-2-line"></i>
                Discharging
            `;

            if (level <= 20) {
                BPercentage.classList.add('animated-red');
            }
        }

        /* Dynamic Background */
        if (level <= 20) {
            document.body.style.background =
                "radial-gradient(circle at top, #3b0000, #000)";
        }
        else if (level <= 50) {
            document.body.style.background =
                "radial-gradient(circle at top, #3b2a00, #000)";
        }
        else {
            document.body.style.background =
                "radial-gradient(circle at top, #002b15, #000)";
        }
    }

    /* Initial Update */
    updateBattery();

    /* Live Updates */
    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
}

batteryInit();