/* {[The file is published on the basis of YetiForce Public License 4.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} */
'use strict';

window.Base_ListView_Js = class {
	/**
	 * Register data table
	 */
	registerDataTable() {
		this.dataTable = app.registerDataTables(this.table, {
			order: [],
			processing: true,
			serverSide: true,
			searching: false,
			orderCellsTop: true,
			deferRender: true,
			ajax: {
				url: 'index.php',
				type: 'POST',
				data: (data) => {
					$.extend(data, this.listForm.serializeFormData());
				},
				error: function (jqXHR, ajaxOptions, thrownError) {
					app.errorLog(jqXHR, thrownError);
					app.showNotify({
						text: thrownError,
						type: 'error',
						stack: window.stackPage
					});
				}
			}
		});
		this.listForm.find('input,select').on('change', () => {
			this.dataTable.ajax.reload();
		});
	}
	/**
	 * Register records events
	 */
	registerListEvents() {
		const self = this;
		this.table.on('click', '.js-delete-record', (e) => {
			app.showNotifyConfirm(
				{
					title: app.translate('JS_LBL_ARE_YOU_SURE_YOU_WANT_TO_DELETE')
				},
				function () {
					AppConnector.request({
						data: {},
						url: $(e.currentTarget).data('url')
					}).done((data) => {
						if (data.result) {
							self.dataTable.ajax.reload();
						}
					});
				}
			);
		});
		this.table.on('click', '.js-search-records', () => {
			this.dataTable.ajax.reload();
		});
		this.table.on('click', '.js-clear-search', () => {
			this.table.find('.js-filter-field').each(function () {
				this.value = '';
			});
			this.dataTable.ajax.reload();
		});
	}
	/**
	 * Register custom view event
	 */
	registerCustomView() {
		let customFiltr = this.listForm.find('.js-cv-list');
		App.Fields.Picklist.showSelect2ElementView(customFiltr);
		customFiltr.on('change', (_) => {
			$.progressIndicatorShow();
			this.reloadView();
		});
		this.listForm.on('click', '.js-filter-tab', (e) => {
			$.progressIndicatorShow();
			this.container.find('[name="cvId"]').val(e.currentTarget.dataset.cvid);
			this.reloadView();
		});
	}
	/**
	 * Reload view
	 */
	reloadView() {
		let data = {
			module: this.container.find('#module').val(),
			view: this.container.find('#view').val(),
			cvId: this.container.find('[name="cvId"]').val()
		};
		window.location.href = app.convertObjectToUrl(data);
	}
	/**
	 * Register modal events.
	 */
	registerEvents() {
		this.container = $('#page');
		this.listForm = $('.js-form-container');
		this.table = this.listForm.find('.js-list-view-table');
		this.registerDataTable();
		this.registerListEvents();
		this.registerCustomView();
	}
};
