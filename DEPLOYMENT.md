# Deployment Instructions for Ubuntu VPS

## 1. Nginx Configuration
Create a new configuration file at `/etc/nginx/sites-available/whamo` (replace `centralwatercommision.airavatatechnologies.com` with your actual domain if different):

```nginx
server {
    listen 80;
    server_name centralwatercommision.airavatatechnologies.com;

    location / {
        proxy_pass http://localhost:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/whamo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 2. PM2 Deployment
Run these commands in the project root directory:

```bash
# Build the project
npm run build

# Start the application using PM2
pm2 start ecosystem.config.cjs

# Save the PM2 list to persist across reboots
pm2 save
pm2 startup
```

## 3. Verify Wine
Ensure Wine is installed and working:
```bash
wine --version
# Should output: wine-10.0
```
