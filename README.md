# MikroTik Vietnam IPv4 List 🇻🇳

*(Scroll down for English version)*

## 🇻🇳 Tiếng Việt

Giải pháp tự động hoá 100% (serverless) giúp Router MikroTik luôn được cập nhật danh sách dải IP nội bộ Việt Nam mới nhất.

### 🌟 Tính năng nổi bật
- **Dữ liệu chuẩn gốc:** Lấy trực tiếp từ API của **RIPE NCC** (Tổ chức Quản lý IP Châu Âu), đảm bảo 100% là các IP được cấp phép hành chính cho các nhà mạng Việt Nam.
- **Tự động 100%:** Sử dụng máy chủ mây **GitHub Actions** để tự động kéo dữ liệu và cập nhật file `.rsc` vào lúc 2:00 sáng Chủ Nhật hàng tuần.
- **Tối ưu cực tốt cho Router:** Dữ liệu IP được lấy từ cấp phát gốc của RIPE nên được gom gọn tối đa (chỉ còn khoảng 1.650 dải). Việc giảm thiểu số lượng dòng lệnh giúp MikroTik tiết kiệm đáng kể tài nguyên CPU và RAM khi xử lý các rule Mangle, Cân bằng tải (PCC) hay Firewall so với việc dùng các danh sách IP trích xuất từ Geolocation thông thường.

### 🚀 Cách cài đặt lên MikroTik
Anh/em không cần phải tự tải file hay mở máy tính. Chỉ cần copy đoạn lệnh dưới đây thả vào Terminal của Winbox là xong. Hệ thống sẽ tự động lấy IP về mỗi tuần.

```routeros
# 1. Tạo Scheduler tự động tải file từ GitHub raw URL lúc 3:00 sáng CN hàng tuần và import
/system scheduler add name="update-vn-ipv4-list" start-time=03:00:00 interval=1w on-event="/tool fetch url=\"https://raw.githubusercontent.com/manh9992/mikrotik-vn-ip/main/vn_ipv4.rsc\" mode=https dst-path=\"vn_ipv4.rsc\"\r\n/import file-name=\"vn_ipv4.rsc\"" comment="Auto update VN IPv4 list weekly from GitHub Actions" policy=read,write,policy,test

# 2. Chạy lệnh thủ công 1 lần đầu tiên ngay bây giờ để dọn list cũ và nạp data siêu sạch từ RIPE về
/tool fetch url="https://raw.githubusercontent.com/manh9992/mikrotik-vn-ip/main/vn_ipv4.rsc" mode=https dst-path="vn_ipv4.rsc"
/import file-name="vn_ipv4.rsc"
```
Danh sách IP sau khi nạp sẽ nằm ở mục `/ip firewall address-list` với tên là `vn_ipv4`.

---

## 🇬🇧 English

An automated, serverless solution to keep your MikroTik RouterOS updated with the latest Vietnam IPv4 subnets.

### 🌟 Features
- **Authoritative Data:** Fetches exact and official IPv4 CIDR allocations directly from the **RIPE NCC** (stat.ripe.net) API.
- **Serverless & Automated:** Uses **GitHub Actions** to automatically run the update script every Sunday at 02:00 AM (GMT+7).
- **Router Optimized:** The IP list is aggregated directly from official RIPE allocations, resulting in highly condensed subnets (around 1,650 entries). This minimal footprint significantly reduces CPU and RAM usage on MikroTik when processing Firewall, Mangle, or PCC rules, making it vastly superior to unoptimized Geolocation-based lists.

### 🚀 How to Use on MikroTik
You don't need to download or run anything manually. Just paste these commands into your MikroTik Winbox Terminal to set up an automatic weekly fetch.

```routeros
# 1. Add a Scheduler to automatically fetch and import the list every Sunday at 03:00 AM
/system scheduler add name="update-vn-ipv4-list" start-time=03:00:00 interval=1w on-event="/tool fetch url=\"https://raw.githubusercontent.com/manh9992/mikrotik-vn-ip/main/vn_ipv4.rsc\" mode=https dst-path=\"vn_ipv4.rsc\"\r\n/import file-name=\"vn_ipv4.rsc\"" comment="Auto update VN IPv4 list weekly from GitHub Actions" policy=read,write,policy,test

# 2. Run manually for the first time to populate the list immediately
/tool fetch url="https://raw.githubusercontent.com/manh9992/mikrotik-vn-ip/main/vn_ipv4.rsc" mode=https dst-path="vn_ipv4.rsc"
/import file-name="vn_ipv4.rsc"
```
The list will be available in `/ip firewall address-list` under the name `vn_ipv4`.
