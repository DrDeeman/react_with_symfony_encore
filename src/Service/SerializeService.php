<?php

namespace App\Service;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;

class SerializeService{
    
    private static $serializer = null;
    
    private function __construct(){}
    private function __clone(){}

    public static function getSerializer(){
    if(self::$serializer==null){
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
       $jsonEncoder = new JsonEncoder();
       $normalizer = new ObjectNormalizer($classMetadataFactory, null, null, null, null, null, [
        AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
            return '';
        }
       ]);
       self::$serializer = new Serializer([$normalizer], [$jsonEncoder]);
    }
    return self::$serializer;
    }
}