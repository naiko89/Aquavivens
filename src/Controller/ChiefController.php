<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChiefController extends AbstractController
{
    #[Route('/chief', name: 'app_chief')]
    public function index(): Response
    {
        return $this->render('main.html.twig', [
            'last_username' => 'cioa',
            'error'         => 'ciao',
        ]);

    }
}
