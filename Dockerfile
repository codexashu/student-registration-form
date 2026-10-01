# Lightweight Nginx Web Server for Production Deployment
FROM nginx:alpine

# Metadata
LABEL maintainer="Ashutosh Pandey <pandeyashutosh082007@gmail.com>"
LABEL description="Student Registration Form Web Portal"

# Copy static webpage files to Nginx web root
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js

# Expose default HTTP port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
