# *Assumes ./build Exists from Azure pipeline*

# Production Environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Removes the default config file
RUN rm /etc/nginx/conf.d/default.conf

# Use our config file
COPY /build/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]