const fs = require('fs');
const https = require('https');

const OUTPUT_FILE = 'vn_ipv4.rsc';
const RIPE_API_URL = 'https://stat.ripe.net/data/country-resource-list/data.json?resource=VN';

console.log('[VN-IP] Bắt đầu lấy danh sách IP Việt Nam từ RIPE NCC...');

https.get(RIPE_API_URL, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(data);
            const ipv4List = parsedData.data.resources.ipv4;
            
            if (!ipv4List || ipv4List.length === 0) {
                throw new Error('Không tìm thấy dải IPv4 nào từ API');
            }

            console.log(`[VN-IP] Đã tải thành công ${ipv4List.length} dải IPv4. Đang tạo file .rsc...`);

            let rscContent = '# Script tự động cập nhật dải IP Việt Nam\n';
            rscContent += '# Nguồn: RIPE NCC (stat.ripe.net)\n';
            rscContent += '# Lần cập nhật cuối: ' + new Date().toISOString() + '\n\n';
            
            rscContent += '/ip firewall address-list remove [find list="vn_ipv4"]\n';
            rscContent += '/ip firewall address-list\n';

            ipv4List.forEach(ip => {
                rscContent += `add list=vn_ipv4 address=${ip}\n`;
            });

            fs.writeFileSync(OUTPUT_FILE, rscContent);
            console.log(`[VN-IP] Đã lưu file cấu hình MikroTik tại: ${OUTPUT_FILE}`);
            
        } catch (error) {
            console.error('[VN-IP] Lỗi khi xử lý dữ liệu JSON:', error.message);
            process.exit(1);
        }
    });
}).on('error', (err) => {
    console.error('[VN-IP] Lỗi kết nối mạng:', err.message);
    process.exit(1);
});
