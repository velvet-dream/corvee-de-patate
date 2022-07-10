var KBIntervalID = 0;
$(document).on(":passagerender", function (ev) {
	clearInterval(KBIntervalID);
	UpdateLinks(ev.content);
	// Search passages for links every 300ms, just in case they get updated, and marks them for key clicks
	KBIntervalID = setInterval(UpdateLinks, 300);
});
// Adds key shortcut indicators to links in passage if there are less than 11 links in the passsage.
function UpdateLinks(Container) {
	// Enables keyboard shortcuts on passages that do not have the "DisableKeyLinks" tag
	if (!tags().includes("DisableKeyLinks")) {
		var Links, i;
		if (typeof Container === "undefined") {
			Container = document;
			Links = $("#passages a").toArray();
		} else {
			Links = $(Container).find("a").toArray();
		}
		if (Links.length > 0) {
			for (i = Links.length - 1; i >= 0; i--) {
				if ($(Links[i]).data("nokeys") || $(Links[i]).parent().data("nokeys")) {
					Links.deleteAt(i);
				}
			}
		}
		if (Links.length === 1) {
			if (!Links[0].id.includes("Link")) {
				Links[0].id = "NextLink";
			}
		} else if (Links.length >= 1 && Links.length <= 10) {
			var n = 1;
			for (i = 0; i < Links.length; i++) {
				if (!Links[i].id.includes("Link")) {
					while ($(Container).find("#Link" + n).length) {
						++n;
						if (n > 10) {
							break;
						}
					}
					if (n < 10) {
						$("<sup>[" + n + "]</sup>").appendTo(Links[i]);
						Links[i].id = "Link" + n;
					} else if (n === 10) {
						$("<sup>[0]</sup>").appendTo(Links[i]);
						Links[i].id = "Link0";
						break;
					} else {
						break;
					}
				}
			}
		}
	}
}
$(document).on("keyup", function (e) {
	// Enables keyboard shortcuts on passages that do not have the "DisableKeyLinks" tag
	// Trigger random click on "." or "r" key
            if ((e.key == "z") || (e.keyCode == 32)) {
                e.preventDefault();
                var Links = $("#passages a"), n, UsableLinks = [];
                if (Links.length > 0) {
                    for (n = 0; n < Links.length; n++) {
                        if (!$(Links[n]).data("nokey")) {
                            UsableLinks.push(n);
                        }
                    }
                    if (UsableLinks.length > 0) {
                        n = random(UsableLinks.length - 1);
                        Links[UsableLinks[n]].click();
                        return false;
                    }
                }
            }  
});
