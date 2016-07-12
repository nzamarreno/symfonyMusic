<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class PlaylistController extends Controller
{
    /**
     * @Route("/playlist", name="playlist_home")
     */
    public function indexAction()
    {
        return $this->render('FrontBundle:Playlist:Playlist.html.twig');
    }
}