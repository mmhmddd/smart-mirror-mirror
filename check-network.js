// check-network.js
// Run this to see all your network interfaces

const os = require('os');

console.log('\n╔═══════════════════════════════════════╗');
console.log('║    Network Interface Information     ║');
console.log('╚═══════════════════════════════════════╝\n');

const interfaces = os.networkInterfaces();

for (const devName in interfaces) {
  const iface = interfaces[devName];
  
  console.log(`📡 ${devName}:`);
  
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i];
    
    if (alias.family === 'IPv4' && !alias.internal) {
      console.log(`   ✓ IPv4: ${alias.address}`);
      console.log(`     Subnet: ${alias.netmask}`);
      
      // Check if this matches ESP32 network
      if (alias.address.startsWith('192.168.66.')) {
        console.log('     ⭐ THIS IS YOUR ESP32 NETWORK!');
        console.log(`     👉 Use this IP in ESP32 code: ${alias.address}`);
      }
    }
  }
  console.log();
}

console.log('\n💡 Your ESP32 is on: 192.168.66.240');
console.log('💡 Look for an IP starting with 192.168.66.xxx above\n');