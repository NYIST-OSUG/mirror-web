document.addEventListener("DOMContentLoaded", function () {
	let ipv4Fetched = false;
	let ipv6Fetched = false;

	fetch("https://whatismyip4.mirror.nyist.edu.cn/")
		.then((response) => response.text())
		.then((ipv4Address) => {
			const ipv4Element = document.getElementById("ipv4-address");
			ipv4Element.textContent = "IPv4 : " + ipv4Address.trim();
			ipv4Fetched = true;
			displayIPInfo();
		})
		.catch((error) => {
			ipv4Fetched = false;
			displayIPInfo();
			console.error("获取IPv4地址时发生错误:", error);
		});

	fetch("https://whatismyip6.mirror.nyist.edu.cn/")
		.then((response) => response.text())
		.then((ipAddress) => {
			const ipv6Regex =
				/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

			if (ipv6Regex.test(ipAddress)) {
				const ipv6Element = document.getElementById("ipv6-address");
				ipv6Element.textContent = "IPv6 : " + ipAddress.trim();
				ipv6Fetched = true;
			} else {
				ipv6Fetched = false;
			}
			displayIPInfo();
		})
		.catch((error) => {
			ipv6Fetched = false;
			displayIPInfo();
			console.error("获取IPv6地址时发生错误:", error);
		});

	function displayIPInfo() {
		const ipv4Container = document.getElementById("ipv4-container");
		const ipv6Container = document.getElementById("ipv6-container");

		if (ipv4Fetched && ipv6Fetched) {
			ipv4Container.style.display = "block";
			ipv6Container.style.display = "block";
		} else if (ipv4Fetched) {
			ipv4Container.style.display = "block";
			ipv6Container.style.display = "none";
		} else if (ipv6Fetched) {
			ipv4Container.style.display = "none";
			ipv6Container.style.display = "block";
		} else {
			ipv4Container.style.display = "none";
			ipv6Container.style.display = "none";
		}
	}
});
