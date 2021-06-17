<?php
/**
 * Phone UIType field file.
 *
 * @package UIType
 *
 * @copyright YetiForce Sp. z o.o.
 * @license   YetiForce Public License 3.0 (licenses/LicenseEN.txt or yetiforce.com)
 * @author Mariusz Krzaczkowski <m.krzaczkowski@yetiforce.com>
 */

namespace YF\Modules\Base\FieldTypes;

/**
 * Phone UIType field class.
 */
class PhoneField extends BaseField
{
	/** {@inheritdoc} */
	public function getDisplayValue(): string
	{
		if (empty($this->value)) {
			return '';
		}
		$value = \App\Purifier::encodeHtml($this->value);
		return "<a class=\"u-cursor-pointer\" href=\"tel:{$value}\">{$value}</a>";
	}
}