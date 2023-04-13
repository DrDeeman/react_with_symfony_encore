<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;

class TestController extends AbstractController{

    #[Route(path:['/','test'],methods:['GET'])]
    public function getPage(){
        return $this->render('index.html.twig');
}   

#[Route(path:'/test_api', methods:['GET'])]
    public function test(Connection $conn){

        return new JsonResponse(
            $conn->fetchAllAssociative("SELECT id,name,description, encode(logo, 'base64') AS logo FROM media")
        );
    }
}
