public_icons_themes =  hicolor

iconsdir = $(datadir)/icons/hicolor

public_icons = \
    16x16/apps/roobuilder.png \
    22x22/apps/roobuilder.png \
    24x24/apps/roobuilder.png \
    32x32/apps/roobuilder.png \
    48x48/apps/roobuilder.png

gtk_update_icon_cache = gtk-update-icon-cache -f -t

EXTRA_DIST = \
	        $(public_icons)

install-data-hook: update-icon-cache
uninstall-hook: update-icon-cache



update-icon-cache:
	@-if test -z "$(DESTDIR)"; then \
		echo "Updating Gtk icon cache."; \
		for theme in $(public_icons_themes); do \
			$(gtk_update_icon_cache) $(datadir)/icons/$$theme; \
		done; \
	else \
		echo "*** Icon cache not updated.  After (un)install, run this:"; \
		for theme in $(public_icons_themes); do \
			echo "***   $(gtk_update_icon_cache) $(datadir)/icons/$$theme"; \
		done; \
	fi

install-icons:
	for icon in $(public_icons); do \
		mkdir -p $(DESTDIR)$(datadir)/icons/hicolor/$$icon; \
		$(INSTALL_DATA) $(srcdir)/$$icon $(DESTDIR)$(datadir)/icons/hicolor/$$icon; \
	done; 
	

uninstall-icons:
	-for icon in $(public_icons); do \
		rm -f  $(DESTDIR)$(datadir)/icons/hicolor/$$icon; \
	done;
	

install-data-local: install-icons update-icon-cache

uninstall-local: uninstall-icons update-icon-cache


