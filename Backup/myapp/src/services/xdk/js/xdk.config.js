var xdk = {
    "devices": ["samsung-tizen", "workstation"],
    "device-details": {
        "samsung-tizen": {
            "players": [{
                "id": "samsung-tizen/player/AVPlayer",
                "extensions": [{
                   "type": "drm",
                   "playready": "samsung-tizen/player/extension/PlayreadyDRMAgent",
                   "widevine": "samsung-tizen/player/extension/WidevineDRMAgent"
                }]
            }]
        }
    }
};