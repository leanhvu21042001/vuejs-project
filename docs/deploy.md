# Deploy Vue to apache vps centos7 has laravel api

## Cách đưa dự án vuejs lên vps

```js
//  Chỉnh sửa base trong file vite.config.js.
// lưu ý. nếu đổi vue_app thành bất kỳ tên khác thì hãy thay đổi toàn bộ vue_app ở configs bên dưới thành tên mong muốn.
{
    base: '/vue_app/'
}
```

```sh
# Build từ máy tính vào folder `dist`
yarn build

# copy folder dist vào /var/www/intern_it57_vuejs (Thay đổi đường dẫn)
scp -r dist root@192.168.55.61:/var/www/intern_it57_vuejs
```

## Tạo virtual host cho vuejs

```sh
# Mở file
vim /etc/httpd/conf/httpd.conf
```

```sh
# Copy toàn bộ cho vào file trên
<VirtualHost *:80>
    ServerName 192.168.55.61
    DocumentRoot /var/www/intern_it57/public

    # mặc định đã có để chạy laravel
    <Directory /var/www/intern_it57/public>
        AllowOverride All
        Require all granted
    </Directory>

    # Tạo virtual host cho frontend app.
    Alias /vue_app /var/www/intern_it57_vuejs
    <Directory /var/www/intern_it57_vuejs>
        FallbackResource /vue_app/index.html
        AllowOverride All
    </Directory>
</VirtualHost>

```

```sh
# Chạy lại apache
sudo systemctl restart httpd
```
