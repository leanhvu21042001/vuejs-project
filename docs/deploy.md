# Deploy Vue to apache vps centos7 has laravel api

## Tạo virtual host cho vuejs

> Truy cập vào vps

```sh
# Mở file
vim /etc/httpd/conf/httpd.conf
# hoặc 
vi /etc/httpd/conf/httpd.conf
```

```sh
# Chèn toàn bộ nội dung này vào file httpd.conf
Listen 8080

<VirtualHost *:80>
    ServerName 192.168.55.61
    DocumentRoot /var/www/intern_it57/public
    <Directory /var/www/intern_it57/public>
        AllowOverride All
    </Directory>
</VirtualHost>

# Set port cho dự án.
<VirtualHost *:8080>
    ServerName 192.168.55.61
    DocumentRoot /var/www/intern_it57_vuejs
    # Alias /vue_app /var/www/intern_it57_vuejs
    # Nếu set alias thì cũng chỉnh lại base: trong vite.config.js
    <Directory /var/www/intern_it57_vuejs>
        # Chỉ mở khi có alias  
        # FallbackResource /vue_app/index.html
        FallbackResource /index.html
        AllowOverride All
    </Directory>
</VirtualHost>
```

```sh
# Chạy lại apache
sudo systemctl restart httpd
```

```sh
# Adjust Firewall
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
# Cấp quyền truy cập port 8080
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
sudo iptables-save
```

## Cách đưa dự án vuejs lên vps

```js
// Chỉ chỉnh sửa nếu thêm alias config apache.
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
