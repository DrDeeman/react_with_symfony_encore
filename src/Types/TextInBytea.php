<?php
namespace App\Types;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;


class TextInBytea extends Type
{
    const TEXTINBYTEA = 'TextInBytea'; // modify to match your type name

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform)
    {
        // return the SQL used to create your column type. To create a portable column type, use the $platform.
        return 'bytea';
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
         
        return base64_encode(stream_get_contents($value));
        
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        return null;
        // This is executed when the value is written to the database. Make your conversions here, optionally using the $platform.
    }

    public function getName()
    {
        return self::TEXTINBYTEA; // modify to match your constant name
    }
}