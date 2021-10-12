{*<!-- {[The file is published on the basis of YetiForce Public License 4.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} -->*}
{strip}
	<!-- tpl-Base-BodyLeft -->
	<div class="container-fluid c-menu__header row px-2">
		<div class="col-sm-2 p-0 pt-2 c-menu__header-logo">
			<a href="{\App\Config::get('portalUrl')}"><img src="{PUBLIC_DIRECTORY}{\App\Config::$logoMenu}" class="img-responsive logo" alt="Logo" title="Logo"></a>
		</div>
		<div class="col-sm-10 userDetails c-menu__header-user">
			<div class="userName">
				<span class="name">{$USER->get('name')}</span>
			</div>
			<div class="companyName">
				<span class="name">{$USER->get('parentName')}</span>
			</div>
		</div>
	</div>
	<div class="menuContainer js-menu--scroll c-menu__body ps ps--active-y" data-js="perfectscrollbar">
		<nav class="tpl-Menu js-menu__content c-menu__content" id="submenu-0">
			<ul class="nav flex-column modulesList">
				{foreach item=ITEM_MENU key=KEY from=$MENU}
					{if in_array($ITEM_MENU['type'],['HomeIcon','Label','Module','QuickCreate','Seperator','Shortcut','SubMenu'])}
						{include file=\App\Resources::templatePath('Menu/'|cat:$ITEM_MENU['type']|cat:'.tpl', $MODULE_NAME)}
					{/if}
				{/foreach}
			</ul>
		</nav>
	</div>
	<!-- /tpl-Base-BodyLeft -->
{/strip}
