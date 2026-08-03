const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Load our settings
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const targetFolder = config.videoFolder;

// Function to check the folder
function checkFolderForVideos() {
    console.log(`\n[${new Date().toLocaleTimeString()}] Checking folder: ${targetFolder}`);
    
    // Check if folder exists, if not, create it
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
        console.log("Folder didn't exist, created a new one.");
        return;
    }

    // Read the files in the directory
    fs.readdir(targetFolder, (err, files) => {
        if (err) {
            console.error("Error reading folder:", err);
            return;
        }

        // Filter for video files (e.g., .mp4)
        const videos = files.filter(file => file.endsWith('.mp4'));

        if (videos.length === 0) {
            console.log("No new videos found this time.");
        } else {
            console.log(`Found ${videos.length} video(s) ready for upload!`);
            videos.forEach(video => {
                console.log(` - Processing: ${video}`);

                // NOTE: This is where we will trigger Module 2 (Metadata) & Module 3 (Puppeteer)
                
            });
        }
    });
}

// Set up the scheduled tasks based on config.json
console.log("Starting YouTube Bot Scheduler...");
config.uploadTimes.forEach(time => {
    cron.schedule(time, () => {
        checkFolderForVideos();
    });
    console.log(`Scheduled check set for cron pattern: ${time}`);
});

// For testing right now, let's run it once immediately so you can see it work:
checkFolderForVideos();