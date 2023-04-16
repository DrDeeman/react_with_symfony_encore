<?php
namespace App\Types;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;


class DatetimeDefaultNow extends Type
{
    const DEFAULTNOW = 'DatetimeDefaultNow'; // modify to match your type name

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform)
    {
        return 'datetime';
        // return the SQL used to create your column type. To create a portable column type, use the $platform.
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        $dt = new \DateTime($value);
        $dt->setTimezone(new \DateTimeZone('UTC'));
        return $dt->format('Y-m-d H:i:s');
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        if ($value == null)
            return 'now()';
        return $value;
        // This is executed when the value is written to the database. Make your conversions here, optionally using the $platform.
    }

    public function getName()
    {
        return self::DEFAULTNOW; // modify to match your constant name
    }
}